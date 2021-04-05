import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class BloquesEntity {

    @PrimaryGeneratedColumn()
    bloque_id:number;
}
