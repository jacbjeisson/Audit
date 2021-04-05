import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import {CategoriasService} from '../services/categorias.service';
@Controller('categorias')
export class CategoriasController {
    constructor (private categoriasService:CategoriasService ){}

    @Get()
    Getcategorias() {
        return this.categoriasService.GetCategorias();
    }

    @Post()
    Postcategorias(@Body() categorias) {
        return this.categoriasService.PostCategorias(categorias);
    }

    @Put()
    Putcategorias(@Body() categorias) {
        return this.categoriasService.PutCategorias(categorias);
    }

    @Delete('/:id')
    Deletecategorias(@Param('id') id) {
        return this.categoriasService.DeleteCategorias(id);
    }
}
