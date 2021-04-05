import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { TiposBloqueEntity } from '../entities/tipos-bloque.entity';
import { Repository } from "typeorm"

@Injectable()
export class TiposBloqueService {
    constructor(
        @InjectRepository(TiposBloqueEntity)
        private repository: Repository<TiposBloqueEntity>
    ) {

    }

    GetTiposBloque() {
        return this.repository.find();
    }


    PostTiposBloque(TiposBloque: TiposBloqueEntity) {
        return this.repository.insert(TiposBloque);
    }


    PutTiposBloque(TiposBloque: TiposBloqueEntity) {
        return this.repository.update(TiposBloque.tipo_bloque_id, TiposBloque);
    }


    DeleteTiposBloque(id: number) {
        return this.repository.delete(id);
    }
}
