import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from 'src/auth/entities/auth.entity';


@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) {}

    async getDashboardStats() {
        try {
            const totalUsers = await this.userRepository.count();
            const totalOrders = await this.orderRepository.count();
            const totalProducts = await this.productRepository.count();
    
            const totalSales = await this.orderRepository
                .createQueryBuilder('orders')
                .select('COALESCE(SUM(orders.totalAmount), 0)', 'total')
                .where('orders.status = :status', { status: 'delivered' })  
                .getRawOne();
    
        
            
    
            return {
                statusCode: 200, 
                message: 'Dashboard statistics retrieved successfully',
                data: {
                    totalUsers,
                    totalOrders,
                    totalProducts,
                    totalSales: totalSales.total || 0,

                },
            };
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            return {
                statusCode: 500,  
                message: 'An error occurred while fetching dashboard statistics',
            };
        }
    }
    
}
