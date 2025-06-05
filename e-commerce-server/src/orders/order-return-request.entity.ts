import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/auth/entities/auth.entity';
export enum ReturnStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class OrderReturnRequest {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Order, order => order.returnRequests, { onDelete: "CASCADE" })
  order: Order;

  @ManyToOne(() => User, (user) => user.returnRequests)
  user: User;

  @Column()
  reason: string;

  @Column({
    type: 'enum',
    enum: ReturnStatus,
    default: ReturnStatus.PENDING,
  })
  status: ReturnStatus;

  @CreateDateColumn()
  requestDate: Date;
}
