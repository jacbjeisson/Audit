import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { CategoriasEntity } from '../entities/categorias.entity';
import { Repository } from "typeorm"

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(CategoriasEntity)
        private repository: Repository<CategoriasEntity>
    ) {

    }

    GetCategorias() {
        return this.repository.find();
    }


    PostCategorias(Categorias: CategoriasEntity) {
        return this.repository.insert(Categorias);
    }


    PutCategorias(Categorias: CategoriasEntity) {
        return this.repository.update(Categorias.categoria_id, Categorias);
    }


    DeleteCategorias(id: number) {
        return this.repository.delete(id);
    }
}
