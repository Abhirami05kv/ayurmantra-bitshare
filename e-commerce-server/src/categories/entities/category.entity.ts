

import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Index, CreateDateColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  @Index()
  name: string;

  @Column({ type: 'text', nullable: true }) 
  description: string;

  @Column({ default: true, name: 'is_active' }) 
  isactive: boolean;

  @Column({ default: 'active' }) 
  status: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

}



