import { Request, Controller, Get, Post, Body, Delete, Param, Put, UseGuards, UnauthorizedException } from '@nestjs/common';
import {TokenAuthGuard} from '../auth/token-auth.guard';
import { CursosService } from '../services/cursos.service';

@Controller('cursos')
export class CursosController {
    constructor (private cursosService:CursosService ){}

    @UseGuards(TokenAuthGuard)
    @Get('creado/:id')
    async GetCursoCreado(@Param('id') id, @Request() req) {
      const autor_id = req.user.usuario_id
      const curso = await this.cursosService.getCursoCreado(id,autor_id);
      if(curso) 
        return curso
      
      throw new UnauthorizedException()
    }

    @Get()
    GetCursos(){
      return this.cursosService.GetCursos()
    }

    @UseGuards(TokenAuthGuard)
    @Post()
    Postcursos(@Body() cursos, @Request() req) {
      const id = req.user.usuario_id
      cursos.autor = id
      return this.cursosService.PostCursos(cursos);
    }

    @UseGuards(TokenAuthGuard)
    @Put()
    async Putcursos(@Body() payload, @Request() req) {
      const autor_id = req.user.usuario_id
      const curso_id = payload.curso_id
      const curso = await this.cursosService.getCursoCreado(curso_id,autor_id);
      if(curso) {
        const { token, ...rest } = payload
        return this.cursosService.PutCursos(rest);
      }
      
      throw new UnauthorizedException()

    }

    @Delete('/:id')
    Deletecursos(@Param('id') id) {
        return this.cursosService.DeleteCursos(id);
    }
}
