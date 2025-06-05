import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { IsOptional } from 'class-validator';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ default: 'active' })  
  status: string;

  @IsOptional()
  @Column("text", {nullable: true }) 
  imageUrls: string;

  @Column({ type: 'int' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
  // image: any;

  @CreateDateColumn({ type: 'timestamp' })  
  createdAt: Date;

}


