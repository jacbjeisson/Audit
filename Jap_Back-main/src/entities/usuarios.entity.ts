import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { AccesoCursosEntity } from './acceso-cursos.entity';
import { CursosEntity } from './cursos.entity';

@Entity()
export class UsuariosEntity {
    @PrimaryGeneratedColumn()
    usuario_id:number;

    @Column({length:100})
    nombres:String;

    @Column({length:100})
    apellidos:String;

    @Column({length:50, unique:true })
    correo:String;

    @Column({length:100, nullable: true, select: false})
    password:String;

    @Column({length:70, nullable: true, select: false})
    token:String;

    @OneToMany (() => AccesoCursosEntity, accesoCursos => accesoCursos.usuario)
    accesosCursos: AccesoCursosEntity[];

    @OneToMany (() => CursosEntity, curso => curso.autor)
    cursos: CursosEntity[];
}
