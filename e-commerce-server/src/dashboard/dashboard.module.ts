import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Order, Product])],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule {}
