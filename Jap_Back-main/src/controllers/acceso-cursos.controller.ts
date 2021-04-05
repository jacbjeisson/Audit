import { Controller, Request, Post, Body, Delete, Param, UseGuards, UnauthorizedException, InternalServerErrorException, Get } from '@nestjs/common';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { CursosService } from '../services/cursos.service';
import { UsuariosService } from '../services/usuarios.service';
import { AccesoCursosService } from '../services/acceso-cursos.service';

@Controller('acceso-cursos')
export class AccesoCursosController {
    constructor(
      private cursosService: CursosService,
      private usuariosService: UsuariosService,
      private accesoCursosService: AccesoCursosService,
    ) { }


    @Get()
    GetAccesos(){
      return this.accesoCursosService.GetAccesoCursos()
    }

    @UseGuards(TokenAuthGuard)
    @Post()
    async PostaccesoCursos(@Body() payload, @Request() req) {
      const usuario_id = req.user.usuario_id
      const curso_id = payload.curso_id
      const curso = await this.cursosService.validarAutoriaCurso(usuario_id,curso_id)

      if(curso) {
        const usuarios = await this.usuariosService.GetUsuariosPorEmail(payload.usuarios)
        try {
          usuarios.forEach(u => {
            this.accesoCursosService.PostAccesoCursos({
              usuario: u.usuario_id,
              curso: curso_id
            })
          })

          return { ok: true }

        } 
        catch {
          throw new InternalServerErrorException()
        }
      }
      else
        throw new UnauthorizedException()
    }

    @UseGuards(TokenAuthGuard)
    @Delete('/:id')
    async DeleteaccesoCursos(@Param('id') id, @Request() req) {
      const usuario_id = req.user.usuario_id
      const accesoCurso = await this.accesoCursosService.GetAccesoCurso(id)
      if(accesoCurso) {
        const autor = accesoCurso.curso.autor
        if(autor.usuario_id === usuario_id)
          return this.accesoCursosService.DeleteAccesoCursos(id);
      }  
      throw new UnauthorizedException()
    }






}
