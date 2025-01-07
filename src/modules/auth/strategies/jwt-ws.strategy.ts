import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from './types/jwt-payload.type';
import { AllConfigType } from '../../../config/config.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtWsStrategy {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async validateJwtToken(
    token: string | undefined,
  ): Promise<JwtPayloadType | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token ?? '', {
        secret: this.configService.get('auth.secret', { infer: true }),
      });

      if (!payload || !payload.id) {
        // throw new UnauthorizedException('Invalid token');
        return null;
      }

      return payload;
    } catch (error) {
      console.error(error);
      // throw new UnauthorizedException('Invalid token');
      console.error('Error validating JWT:', error);
      return null;
    }
  }
}
