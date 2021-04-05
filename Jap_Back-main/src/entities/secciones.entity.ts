import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class SeccionesEntity {
    @PrimaryGeneratedColumn()
    seccion_id:number;
}
