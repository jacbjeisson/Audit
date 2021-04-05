import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validateUser(correo: string, password: string): Promise<any> {
    let user = await this.usersService.GetUsuario(correo);
    
    if(user && user.password === password) {
      user = this.usersService.gestionarToken(user)
      const { token, password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByToken(token: any): Promise<any> {
    let user = await this.usersService.GetUsuarioByToken(token)
    if(user) {
      return user
    }
    return null

  }

  async login(userPayload: any) {
    let user = await this.usersService.GetUsuario(userPayload.correo)
    user = this.usersService.gestionarToken(user) 

    const refreshTokenPayload = {
      username: user.correo,
    }
    return {
      token: user.token,
      refreshToken: this.jwtService.sign(refreshTokenPayload)
    }
  }

}
