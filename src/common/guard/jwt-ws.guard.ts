import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JwtWsStrategy } from '../../modules/auth/strategies/jwt-ws.strategy';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly jwtWsStrategy: JwtWsStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const wsContext = context.switchToWs();
    const client = wsContext.getClient();
    const token = client.handshake.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    try {
      const user = await this.jwtWsStrategy.validateJwtToken(token);
      if (user) {
        client['user'] = user;
        return true;
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
