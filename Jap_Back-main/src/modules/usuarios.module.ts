import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from '../entities/usuarios.entity';
import { UsuariosService } from '../services/usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuariosEntity])],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
