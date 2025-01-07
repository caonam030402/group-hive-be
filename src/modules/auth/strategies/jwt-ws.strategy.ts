import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from './types/jwt-payload.type';
import { AllConfigType } from '../../../config/config.type';

@Injectable()
export class JwtWsStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<AllConfigType>) {
    super({
      jwtFromRequest: (req) => {
        const token = req.handshake.headers['authorization'];
        if (token) {
          return token.split(' ')[1];
        }

        throw new UnauthorizedException('No authorization token found');
      },
      secretOrKey: configService.get('auth.secret', { infer: true }),
    });
  }

  public validate(payload: JwtPayloadType) {
    if (!payload.id) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
