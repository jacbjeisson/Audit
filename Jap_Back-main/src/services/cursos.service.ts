import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { CursosEntity } from '../entities/cursos.entity';
import { Repository } from "typeorm"

@Injectable()
export class CursosService {
    constructor(
        @InjectRepository(CursosEntity)
        private repository: Repository<CursosEntity>
    ) {

    }

    GetCursos() {
      return this.repository.find({
        relations: [
          "categoria",
          "autor",
          "accesosDados",
          "accesosDados.usuario",
        ]
      });
    }

    getCursoCreado(curso_id:string, autor_id:string) {
      return this.repository.findOne({
        where: {
          curso_id,
          autor: autor_id
        },
        relations: [
          "categoria",
          "accesosDados",
          "accesosDados.usuario",
        ]
      })
    }

    validarAutoriaCurso(usuario_id:string, curso_id:string) {
      return this.repository.findOne({
        where: {
          curso_id,
          autor: usuario_id,
        }
      })
    }

    PostCursos(Cursos: CursosEntity) {
        return this.repository.insert(Cursos);
    }


    PutCursos(Cursos: CursosEntity) {
        return this.repository.update(Cursos.curso_id, Cursos);
    }


    DeleteCursos(id: number) {
        return this.repository.delete(id);
    }
}
