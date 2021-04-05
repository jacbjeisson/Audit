import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { BloquesEntity } from '../entities/bloques.entity'
@Injectable()
export class BloquesService {
    constructor(
        @InjectRepository(BloquesEntity)
        private repository: Repository<BloquesEntity>
    ) {

    }

    GetBloques() {
        return this.repository.find();
    }


    PostBloques(Bloques: BloquesEntity) {
        return this.repository.insert(Bloques);
    }


    PutBloques(Bloques: BloquesEntity) {
        return this.repository.update(Bloques.bloque_id, Bloques);
    }


    DeleteBloques(id: number) {
        return this.repository.delete(id);
    }
}
