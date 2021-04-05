import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import { SeccionesEntity } from '../entities/secciones.entity';
import {Repository} from "typeorm"

@Injectable()
export class SeccionesService {
    constructor(
        @InjectRepository(SeccionesEntity)
        private  repository: Repository<SeccionesEntity>
        ){
            
        }

        GetSecciones(){
            return this.repository.find();
            }
            
           
            PostSecciones( Secciones:SeccionesEntity){
                return this.repository.insert(Secciones);
            } 
            
            
            PutSecciones(Secciones:SeccionesEntity){
                return this.repository.update(Secciones.seccion_id,Secciones);
            }
                
               
            DeleteSecciones(id:number){
                    return this.repository.delete(id);
            }
}
