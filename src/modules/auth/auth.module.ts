import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from 'src/common/guard/admin-guard';
import { UserModule } from '../users/user.module';
//import { LocalStrategy } from 'src/common/strategy/local-stategy';
import {ConfigModule} from '@nestjs/config'

@Module({
  controllers: [AuthController],
  providers: [AuthService ],
  exports: [AuthService, PassportModule],
  imports : [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
     secret: process.env.APP_SECRET_KEY,
     signOptions: {expiresIn : '2h'}
    }),
  ],
})
export class AuthModule {}
