import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class LeccionesEntity {

    @PrimaryGeneratedColumn()
    leccion_id:number;
}
