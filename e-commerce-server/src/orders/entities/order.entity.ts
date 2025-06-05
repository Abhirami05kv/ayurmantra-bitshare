
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { Address } from 'src/auth/entities/address.entity';
import { User } from 'src/auth/entities/auth.entity';
import { OrderItem } from './order-item.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { OrderReturnRequest } from '../order-return-request.entity';
import { GiftCard } from 'src/gitfcard/entities/gift-card.entity';
import { GiftCardPurchase } from 'src/gitfcard/entities/gift-card-purchase.entity';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'pending',
  ORDER_CONFIRMED = 'order_confirmed',
  SHIPPED = 'shipped',
  CANCELLED = 'cancelled',
  RETURN = 'return',
  DELIVERED = 'delivered',
  PAYMENT_FAILED = 'payment_failed',
  PAYMENT_SUCCESS = 'payment_success',
  PROCESSING = 'processing',
  FAILED = 'failed',
  COMPLETED = 'completed',
  RETURN_REQUESTED = "RETURN_REQUESTED",
}

export enum PaymentMethod {
  COD = 'Cash on Delivery',
  ONLINE = 'Online Payment',
  WALLET= 'wallet'
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  

  // @ManyToOne(() => Address, { eager: true, nullable: true })
  // @JoinColumn({ name: 'addressId' })
  // address: Address;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'jsonb' ,nullable: true})  
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.COD })
  paymentMethod: PaymentMethod;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  


  @Column({ nullable: true })
  razorpayOrderId?: string;

  @Column({ nullable: true })
  razorpayPaymentId?: string;

  @Column({ nullable: true })
  razorpaySignature?: string;

  @Column({ type: 'varchar', default: 'pending' })
  paymentStatus: string;

  @ManyToOne(() => Coupon, { nullable: true })  
  coupon?: Coupon | null;

  @ManyToOne(() => GiftCard, { nullable: true })  
  giftCard?: GiftCard | null;

  @Column({ nullable: true })
  giftcardCode?: string;

  @Column({ type: 'decimal', nullable: true, default: 0 })
  giftCardDiscount?: number;

  @Column({ default: 0 })  
  discountAmount: number;
  
  @OneToMany(() => OrderReturnRequest, returnRequest => returnRequest.order, { cascade: true })
  returnRequests: OrderReturnRequest[];

  @CreateDateColumn()
  createdAt: Date; 

  @OneToMany(() => GiftCardPurchase, (giftCardPurchase) => giftCardPurchase.order)
  giftCardPurchases: GiftCardPurchase[];
}
