import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Column } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Cart } from '../entities/cart.entity';
import { User } from 'src/auth/entities/auth.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
    cart: Cart; 

  @ManyToOne(() => User, (user) => user.cartItems, { nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, { eager: true })
  product: Product;
 
  price: number;  

  @Column({ type: 'int', default: 1 })
  quantity: number;

  cartItem: { id: number; items: { id: string; product: Product; quantity: number | undefined; }[]; };
  order: any;

}
