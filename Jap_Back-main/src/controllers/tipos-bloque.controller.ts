import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import {TiposBloqueService} from '../services/tipos-bloque.service';
@Controller('tipos-bloque')
export class TiposBloqueController {
    constructor (private tipoBloqueService:TiposBloqueService){}

    @Get()
    GettipoBloque() {
        return this.tipoBloqueService.GetTiposBloque();
    }

    @Post()
    PosttipoBloque(@Body() tipoBloque) {
        return this.tipoBloqueService.PostTiposBloque(tipoBloque);
    }

    @Put()
    PuttipoBloque(@Body() tipoBloque) {
        return this.tipoBloqueService.PutTiposBloque(tipoBloque);
    }

    @Delete('/:id')
    DeletetipoBloque(@Param('id') id) {
        return this.tipoBloqueService.DeleteTiposBloque(id);
    }
}
