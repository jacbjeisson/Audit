import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { CursosEntity } from './cursos.entity';

@Entity()
export class CategoriasEntity {

  @PrimaryGeneratedColumn()
  categoria_id:number;

  @Column({ length: 30 })
  nombre:String

  @OneToMany(() => CursosEntity, curso => curso.categoria)
  cursos: CursosEntity[];

}
