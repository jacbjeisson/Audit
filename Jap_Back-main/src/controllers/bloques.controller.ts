import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { BloquesService } from '../services/bloques.service';
@Controller('bloques')
export class BloquesController {
    constructor(private bloquesService: BloquesService) { }

    @Get()
    Getbloques() {
        return this.bloquesService.GetBloques();
    }

    @Post()
    Postbloques(@Body() bloques) {
        return this.bloquesService.PostBloques(bloques);
    }

    @Put()
    Putbloques(@Body() bloques) {
        return this.bloquesService.PutBloques(bloques);
    }

    @Delete('/:id')
    Deletebloques(@Param('id') id) {
        return this.bloquesService.DeleteBloques(id);
    }
}
