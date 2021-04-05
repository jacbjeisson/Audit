import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import {SeccionesService} from '../services/secciones.service';
@Controller('secciones')
export class SeccionesController {
    constructor (private seccionesService:SeccionesService){}

    @Get()
    Getsecciones() {
        return this.seccionesService.GetSecciones();
    }

    @Post()
    Postsecciones(@Body() secciones) {
        return this.seccionesService.PostSecciones(secciones);
    }

    @Put()
    Putsecciones(@Body() secciones) {
        return this.seccionesService.PutSecciones(secciones);
    }

    @Delete('/:id')
    Deletesecciones(@Param('id') id) {
        return this.seccionesService.DeleteSecciones(id);
    }
}
