
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/auth.entity';
import { Address } from './entities/address.entity'
import { JwtModule } from '@nestjs/jwt';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { CartModule } from 'src/cart/cart.module';
import { UsersModule } from 'src/users/users.module';



@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    TypeOrmModule.forFeature([User,Address]),
    forwardRef(() => CartModule),       
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'root',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports : [AuthService, JwtModule, JwtStrategy, PassportModule, TypeOrmModule],
})
export class AuthModule {}
