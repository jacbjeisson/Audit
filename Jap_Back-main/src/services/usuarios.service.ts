import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { UsuariosEntity } from "../entities/usuarios.entity";
import { In, Repository } from "typeorm"
import { constants } from '../auth/constants' 
const md5 = require("md5")

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuariosEntity)
    private repository: Repository<UsuariosEntity>
  ) {}

  GetUsuario(correo: string) {
    return this.repository.findOne({
      where: { correo },
      select: ['usuario_id','correo','password','token']
    });
  }

  GetUsuarioConCursos(id: string) {
    return this.repository.findOne(id,{
      relations: [
        "accesosCursos",
        "accesosCursos.curso",
        "accesosCursos.curso.categoria",
        "accesosCursos.curso.autor",
      ],
    })
  }

  GetUsuariosPorEmail(correos:any[]) {

    return this.repository.find({
      where: {correo: In(correos)},
      select: ["usuario_id"]
    })

  }

  GetUsuarioByToken(token: string) {
    return this.repository.findOne({token});
  }

  PostUsuarios(usuario: UsuariosEntity) {
    const timestamp = Date.now()
    const hashAEncriptar = constants.secretForToken + timestamp
    usuario.token = md5(hashAEncriptar)
    return this.repository.insert(usuario);
  }


  PutUsuarios(id: string, cambios: UsuariosEntity) {
    return this.repository.update(id, cambios);
  }


  DeleteUsuarios(id: number) {
    return this.repository.delete(id);
  }

  gestionarToken(usuario: UsuariosEntity) {
    if(usuario) {
    const timestamp = Date.now()
    const hashAEncriptar = constants.secretForToken + timestamp
    usuario.token = md5(hashAEncriptar)

    this.repository.update(usuario.usuario_id, usuario);
    return usuario
    }
    else {
      throw new UnauthorizedException()
    }
  }
}
