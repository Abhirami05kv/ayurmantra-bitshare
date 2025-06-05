import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { GiftCard } from './gift-card.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity('gift_card_purchases')
export class GiftCardPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.giftCardPurchases)
  user: User;

  @ManyToOne(() => GiftCard, (giftCard) => giftCard.purchases)
  giftCard: GiftCard;

  @Column({ type: 'enum', enum: ['razorpay', 'cod'], default: 'razorpay' })
  paymentMethod: string;

  @Column({ nullable: true })
  razorpayOrderId?: string;

  @Column({ nullable: true })
  razorpayPaymentId: string;

  @Column({ nullable: true })
  razorpaySignature: string;

  @Column({ default: 'pending' })
  paymentStatus: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  purchaseDate: Date;

  @Column('decimal', { nullable: true })  
  purchaseAmount: number;

  @Column({nullable:true})
  uniquecode: string;

  @ManyToOne(() => Order, (order) => order.giftCardPurchases, { nullable: true }) 
  order: Order;

  @Column({ nullable: true })
    redeemedByUserId: number;
}