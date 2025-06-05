import { IsNumber } from "class-validator";
import { Address } from "src/auth/entities/address.entity";
import { UserRole } from "src/auth/user-role.enum";
import { Cart } from "src/cart/entities/cart.entity";
import { CartItem } from "src/cart/entities/cart.item.entity";
import { Order } from "src/orders/entities/order.entity";
import { OrderReturnRequest } from "src/orders/order-return-request.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  // profilePic: any;
  // orders: any;
  email: string | undefined;
 // @Column({nullable:true})
  username: string | undefined;

  @Column()
  @IsNumber()
  phoneNumber: string;

  @OneToMany(() => Order, order => order.user)
  order: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
  

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  address: Address[];
    

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];  

  @OneToMany(() => OrderReturnRequest, (returnRequest) => returnRequest.user)
  returnRequests: OrderReturnRequest[];

  

  @Column({ nullable: true }) 
  deviceToken: string;


  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
  
}
