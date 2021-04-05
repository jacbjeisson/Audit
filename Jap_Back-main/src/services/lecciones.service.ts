import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { LeccionesEntity } from '../entities/lecciones.entity';
import { Repository } from "typeorm"

@Injectable()
export class LeccionesService {
    constructor(
        @InjectRepository(LeccionesEntity)
        private repository: Repository<LeccionesEntity>
    ) {

    }

    GetLecciones() {
        return this.repository.find();
    }


    PostLecciones(Lecciones: LeccionesEntity) {
        return this.repository.insert(Lecciones);
    }


    PutLecciones(Lecciones: LeccionesEntity) {
        return this.repository.update(Lecciones.leccion_id, Lecciones);
    }


    DeleteLecciones(id: number) {
        return this.repository.delete(id);
    }
}
