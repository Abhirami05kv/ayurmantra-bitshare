import { IsDate } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, BeforeInsert } from 'typeorm';
import { GiftCardPurchase } from './gift-card-purchase.entity';

@Entity('gift_cards')
export class GiftCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // @Column({ type: 'decimal', precision: 10, scale: 2 })
  // price: number;

  @Column("text", {nullable: true })
  image: string;

  @Column({ type: 'timestamp', nullable: true })
  @IsDate()
  expiryDate: Date;

  @Column({ default: true }) 
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 'active' })  
  status: string;

  @Column('decimal',{nullable:true})
  purchaseAmount: number; 

  @Column('decimal',{nullable:true})
  usableAmount: number;

  @Column('decimal')
  balance: number;

  @OneToMany(() => GiftCardPurchase, (purchase) => purchase.giftCard)
  purchases: GiftCardPurchase[];

  @ManyToOne(() => GiftCard, (giftCard) => giftCard.purchases)
  giftCard: GiftCard;

 

  @Column({ default: false })  
    is_redeemed: boolean;

    
  }


