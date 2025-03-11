import {
  Logger,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  BaseWsExceptionFilter,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { WsAuthGuard } from '../../common/guard/jwt-ws.guard';
import { DocsHubsService } from './docs-hubs.service';

@UsePipes(new ValidationPipe())
@UseGuards(WsAuthGuard)
@UseFilters(BaseWsExceptionFilter)
@WebSocketGateway(3003, { cors: true })
export class DocsHubGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger = new Logger('DocsGateway');
  private docs = new Map<string, Y.Doc>();
  private autosaveInterval = 5000;

  constructor(private readonly docsHubsService: DocsHubsService) {
    this.startAutosave();
  }

  handleConnection(socket: Socket) {
    this.logger.log(`🔗 Client Connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`❌ Client Disconnected: ${socket.id}`);
  }

  @SubscribeMessage('joinDocument')
  async handleJoinDocument(
    @ConnectedSocket() socket: Socket,
    @MessageBody('docId') docId: string,
  ) {
    if (!this.docs.has(docId)) {
      const savedDoc = await this.docsHubsService.findOne(docId);
      const doc = new Y.Doc();

      if (savedDoc?.content) {
        try {
          Y.applyUpdate(doc, new Uint8Array(savedDoc.content));
        } catch (error) {
          this.logger.error(`❌ Lỗi khi load tài liệu: ${error.message}`);
        }
      }
      this.docs.set(docId, doc);
      this.logger.log(`✅ Lưu doc ${docId} vào this.docs`);
    }

    await socket.join(docId);
    const doc = this.docs.get(docId);
    new WebsocketProvider('ws://localhost:3003', docId, doc as any);

    socket.emit('loadDocument', Y.encodeStateAsUpdate(doc as any));

    this.logger.log(`📄 User ${socket.id} joined document ${docId}`);
  }

  private startAutosave() {
    setInterval(async () => {
      for (const [docId, doc] of this.docs.entries()) {
        await this.docsHubsService.update(docId, {
          content: Y.encodeStateAsUpdate(doc) as Buffer,
        });
        this.logger.log(`💾 Auto-saved document ${docId}`);
      }
    }, this.autosaveInterval);
  }
}
