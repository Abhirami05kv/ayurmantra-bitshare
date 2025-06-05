import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { NotificationService } from './notification.service';
import { firebaseAdminProvider } from './firebase-admin.provider';
import { User } from '../auth/entities/auth.entity'; 
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from 'src/common/auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationController } from './notification.controller'; 
import { Notification } from './entities/notification.entity';
import { UsersModule } from 'src/users/users.module';
import { FirebaseAdminService } from './FirebaseAdminService';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forFeature([User, Notification]),
    JwtModule,
    // AuthModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, firebaseAdminProvider,  JwtService,FirebaseAdminService],
  exports: [firebaseAdminProvider, NotificationService,  FirebaseAdminService], 
})
export class NotificationModule {}


