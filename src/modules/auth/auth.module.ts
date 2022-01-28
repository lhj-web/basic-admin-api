/**
 * @file Auth module
 * @module module/auth/module
 * @author Name6
 */

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as APP_CONFIG from '@/app.config';
import { AuthProvider } from './auth.model';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: APP_CONFIG.AUTH.jwtTokenSecret as jwt.Secret,
      signOptions: {
        expiresIn: APP_CONFIG.AUTH.expiresIn as number,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthProvider, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
