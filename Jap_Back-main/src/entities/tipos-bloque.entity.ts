import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class TiposBloqueEntity {

    @PrimaryGeneratedColumn()
    tipo_bloque_id:number;
}
