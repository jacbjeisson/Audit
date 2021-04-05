import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import {LeccionesService} from '../services/lecciones.service';
@Controller('lecciones')
export class LeccionesController {
    constructor (private leccionesService:LeccionesService ){}

    @Get()
    Getlecciones() {
        return this.leccionesService.GetLecciones();
    }

    @Post()
    Postlecciones(@Body() lecciones) {
        return this.leccionesService.PostLecciones(lecciones);
    }

    @Put()
    Putlecciones(@Body() lecciones) {
        return this.leccionesService.PutLecciones(lecciones);
    }

    @Delete('/:id')
    Deletelecciones(@Param('id') id) {
        return this.leccionesService.DeleteLecciones(id);
    }
}
