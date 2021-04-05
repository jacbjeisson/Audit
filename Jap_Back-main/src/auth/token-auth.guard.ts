import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from './auth.service';

@Injectable()
export class TokenAuthGuard extends AuthGuard('token') {

  constructor(private authService:AuthService) {
    super()
  }


  async canActivate(ctx: ExecutionContext) {
    const body = ctx.switchToHttp().getRequest().body;
    const token = body.token
    if(token){
      const user = await this.authService.validateUserByToken(token)
      if(user) {
        ctx.switchToHttp().getRequest().user = user 
        return true
      }
      else {
        throw new UnauthorizedException()
      }
    }
    return false;
  }

}
