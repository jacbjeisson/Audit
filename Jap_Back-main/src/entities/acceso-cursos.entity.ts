import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { CursosEntity } from './cursos.entity';
import { UsuariosEntity } from './usuarios.entity';

@Entity()
export class AccesoCursosEntity {

    @PrimaryGeneratedColumn()
    acceso_curso_id:number;

    @ManyToOne(() => UsuariosEntity, usuario => usuario.accesosCursos)
    usuario: UsuariosEntity;

    @ManyToOne(() => CursosEntity, curso => curso.accesosDados)
    curso: CursosEntity;

}
