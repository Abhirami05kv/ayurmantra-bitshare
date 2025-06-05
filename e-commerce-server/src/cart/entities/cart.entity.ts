import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Column } from 'typeorm';
import { CartItem } from '../entities/cart.item.entity';
import { Address } from 'src/auth/entities/address.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { GiftCard } from 'src/gitfcard/entities/gift-card.entity';

@Entity()
export class Cart {
  static appliedCoupon: null;
  // static totalAmount(totalAmount: any) {
  //   throw new Error('Method not implemented.');
  // }

  @PrimaryGeneratedColumn()
  id: number    ;

  @ManyToOne(() => User, (user) => user.carts, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) 
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true }) 
  items: CartItem[];

  // @ManyToOne(() => Address, { nullable: true, eager: true }) 
  // @JoinColumn({ name: 'addressId' }) 
  // address: Address;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: { 
    to: (value: number) => value, 
    from: (value: string) => parseFloat(value) 
}}) 
totalAmount: number; 

@Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: { 
  to: (value: number) => value, 
  from: (value: string) => parseFloat(value) 
}}) 
grandTotal: number;


  @ManyToOne(() => Coupon, { nullable: true })
  @JoinColumn({ name: 'coupon_id' })
  appliedCoupon: Coupon | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
discountAmount: number;

@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
giftcardDiscountAmount: number;

@Column({ type: 'varchar', nullable: true }) // Change type to 'varchar'
couponCode: string | null;

@Column({ type: 'varchar', nullable: true }) // Change type to 'varchar'
giftcardCode: string | null;



@ManyToOne(() => GiftCard, { nullable: true })
@JoinColumn({ name: 'gift_card_id' })
appliedGiftCard: GiftCard | null;

@ManyToOne(() => GiftCard, { nullable: true, eager: true })
giftCard: GiftCard |null ;
  
}

