import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../modules/usuarios.module'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { TokenStrategy } from './token.strategy';
import { JwtStrategy } from './jwt.strategy';
import { constants } from './constants';


@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: constants.secret,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  providers: [AuthService, TokenStrategy, LocalStrategy, JwtStrategy ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
