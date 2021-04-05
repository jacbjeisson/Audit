import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { AccesoCursosEntity } from '../entities/acceso-cursos.entity'
@Injectable()
export class AccesoCursosService {
    constructor(
        @InjectRepository(AccesoCursosEntity)
        private repository: Repository<AccesoCursosEntity>,
    ){}

  
    async PostAccesoCursos(accesoCursos:any){
      const yaExistentes = await this.repository.find({
        where: { 
          usuario: accesoCursos.usuario,
          curso: accesoCursos.curso,
        },
      })
      if(yaExistentes.length > 0) {
        return null
      }
      return this.repository.insert(accesoCursos)
    } 
    
    
    PutAccesoCursos(accesoCursos:AccesoCursosEntity){
        return this.repository.update(accesoCursos.acceso_curso_id,accesoCursos);
    }
        
       
    DeleteAccesoCursos(id:number){
      return this.repository.delete(id);
    }   

    
    GetAccesoCurso(id:number) {
      return this.repository.findOne(id,{
        relations: ["curso","curso.autor"]
      })
    }

    GetAccesoCursos(){
            return this.repository.find({
              relations: ["usuario","curso"]
            });
    }   


}
