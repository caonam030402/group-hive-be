import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { INestApplication } from '@nestjs/common';

export class RedisIoAdapter extends IoAdapter {
  constructor(
    app: INestApplication<any>,
    private readonly configService: ConfigService<AllConfigType>,
  ) {
    super(app);
  }

  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      username: this.configService.get('redis.redisUsername', { infer: true }),
      password: this.configService.get('redis.redisPassword', { infer: true }),
      socket: {
        host: this.configService.get('redis.redisHost', { infer: true }),
        port: this.configService.get('redis.redisPort', { infer: true }),
      },
    });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
