import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToOne } from 'typeorm'
import { AccesoCursosEntity } from './acceso-cursos.entity';
import {CategoriasEntity} from './categorias.entity';
import {UsuariosEntity} from './usuarios.entity';

@Entity()
export class CursosEntity {

  @PrimaryGeneratedColumn()
  curso_id:number;

  @Column({ length: 50 })
  nombre:String;

  @Column({ default: false })
  esPublico:boolean;

  @ManyToOne(() => UsuariosEntity, usuario => usuario.cursos)
  autor: UsuariosEntity;

  @ManyToOne(() => CategoriasEntity, categoria => categoria.cursos)
  categoria: CategoriasEntity;

  @OneToMany(() => AccesoCursosEntity, accesoCursos => accesoCursos.curso)
  accesosDados: AccesoCursosEntity[];
}
