import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WebSocketJwtAuthGuard implements CanActivate {
  private readonly logger = new Logger('WebSocketJwtAuthGuard');

  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(213);
    this.logger.debug('WebSocketJwtAuthGuard.canActivate called');

    if (context.getType() !== 'ws') {
      this.logger.debug('Context type is not ws');
      return false;
    }

    const client: Socket = context.switchToWs().getClient();
    this.logger.debug(`Client connected: ${client.id}`);

    try {
      const token = this.extractToken(client);
      this.logger.debug(`Extracted token: ${token ? 'exists' : 'not found'}`);

      if (!token) {
        throw new WsException('Token not found');
      }

      // Tạm thởi return true để test
      return true;
    } catch (err) {
      this.logger.error('Error in guard:', err);
      throw new WsException('Invalid token');
    }
  }

  private extractToken(client: Socket): string | null {
    // Log handshake data để debug
    this.logger.debug('Handshake headers:', client.handshake.headers);
    this.logger.debug('Handshake query:', client.handshake.query);

    // Try to get token from handshake auth
    const authHeader = client.handshake.headers.authorization;
    if (authHeader) {
      const [type, token] = authHeader.split(' ');
      return type === 'Bearer' ? token : null;
    }

    // Try to get token from handshake query
    const queryToken = client.handshake.query.token;
    if (queryToken && typeof queryToken === 'string') {
      return queryToken;
    }

    return null;
  }
}
