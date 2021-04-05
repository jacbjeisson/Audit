import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards, Request } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TokenAuthGuard } from '../auth/token-auth.guard';

@Controller('usuarios')
export class UsuariosController {
    constructor (
      private usuariosService: UsuariosService,
      private authService: AuthService
    ){}

    @UseGuards(TokenAuthGuard)
    @Get('/yo')
    getUsuario(@Request() req) {
      return req.user
    }

    @UseGuards(TokenAuthGuard)
    @Get('/cursos')
    getCursosUsuario(@Request() req) {
      return this.usuariosService.GetUsuarioConCursos(req.user.usuario_id)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req) {
      return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/refresh-token')
    refreshToken(@Request() req) {
      return this.authService.login(req.user)
    }

    @Post()
    Postusuarios(@Body() usuarios) {
        return this.usuariosService.PostUsuarios(usuarios);
    }

  
    @UseGuards(TokenAuthGuard)
    @Put()
    Putusuarios(@Request() req, @Body() userPayload) {
      const id = req.user.usuario_id
      const { token, ...cambios} = userPayload
      return this.usuariosService.PutUsuarios(id,cambios);
    }

    @Delete('/:id')
    Deleteusuarios(@Param('id') id) {
        return this.usuariosService.DeleteUsuarios(id);
    }
}
