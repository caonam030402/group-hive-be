import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class WsAuthGuard extends AuthGuard('jwt') {
  canActivate(context: any): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const wsContext = context.switchToWs();
    const client = wsContext.getClient();
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    client.user = user;
    return user;
  }
}
