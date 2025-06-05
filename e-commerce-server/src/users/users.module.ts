import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/auth/entities/auth.entity';
import { Address } from '../auth/entities/address.entity';
import { CartModule } from 'src/cart/cart.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([User,Address]),
  forwardRef(() => CartModule),
  forwardRef(() => NotificationModule)
],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
