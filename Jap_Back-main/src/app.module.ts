import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
require('dotenv').config()

//controllers
import { UsuariosController } from './controllers/usuarios.controller';
import { CursosController } from './controllers/cursos.controller';
import { AccesoCursosController } from './controllers/acceso-cursos.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { TiposBloqueController } from './controllers/tipos-bloque.controller';
import { SeccionesController } from './controllers/secciones.controller';
import { LeccionesController } from './controllers/lecciones.controller';
import { BloquesController } from './controllers/bloques.controller';

//services
import {AccesoCursosService} from './services/acceso-cursos.service';
import {BloquesService} from './services/bloques.service';
import {CategoriasService} from './services/categorias.service';
import {CursosService} from './services/cursos.service';
import {LeccionesService} from './services/lecciones.service';
import {SeccionesService} from './services/secciones.service';
import {TiposBloqueService} from './services/tipos-bloque.service';
import {UsuariosService} from './services/usuarios.service';

//entities
import {AccesoCursosEntity} from './entities/acceso-cursos.entity';
import {BloquesEntity} from './entities/bloques.entity';
import {CategoriasEntity} from './entities/categorias.entity';
import {CursosEntity} from './entities/cursos.entity';
import {LeccionesEntity} from './entities/lecciones.entity';
import {TiposBloqueEntity} from './entities/tipos-bloque.entity';
import {UsuariosEntity} from './entities/usuarios.entity';
import {SeccionesEntity} from './entities/secciones.entity';
import { AuthModule } from './auth/auth.module';


const entidades=[AccesoCursosEntity,BloquesEntity,
                 CategoriasEntity,CursosEntity,LeccionesEntity,
                 TiposBloqueEntity,UsuariosEntity,SeccionesEntity]
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: entidades,
      synchronize: true,
      retryDelay:3000,
      retryAttempts:10,
      extra: {
        ssl: process.env.PROD === "true"
      }
    }),TypeOrmModule.forFeature(entidades), AuthModule,],
  controllers: [
    UsuariosController,
    CursosController,
    AccesoCursosController,
    CategoriasController,
    TiposBloqueController,
    SeccionesController,
    LeccionesController,
    BloquesController
  ],
  providers: [
    AccesoCursosService,
    BloquesService,
    CategoriasService,
    CursosService,
    LeccionesService,
    SeccionesService,
    TiposBloqueService,
    UsuariosService,
  ],
})
export class AppModule {}
