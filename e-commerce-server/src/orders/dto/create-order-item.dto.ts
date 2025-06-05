import { IsInt, Min, IsNumber, IsPositive } from 'class-validator';
import { ManyToOne } from 'typeorm';
import { Order } from '../entities/order.entity';

export class OrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;
}
