
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';
import { DiscountType } from '../enums/discount-type.enum';

@Entity()
export class Coupon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  coupon_code: string;

  @Column({ type: 'enum', enum: DiscountType,  nullable: true })
  discount_type: string; // 'fixed' or 'percentage'

  @Column({ type: 'decimal', nullable: true, default: 0 })
  discount_value: number;

  @Column({ type: 'decimal', nullable: false, default: 0 })  // Ensure it exists
  discount_percentage: number;

  @Column({ type: 'timestamp' })
  expiry_date: Date;

  @Column({ default: 0 })
  min_purchase: number;

  @Column({ default: 0 })
  usage_limit: number;

  @Column({ default: 0 })
  used_count: number;

  @Column({ default: true })
  is_active: boolean;
  code: any;
  static discount_type: string;
  static discount_value: number;
  @Column({ default: false }) 
  isUsed: boolean;

  @CreateDateColumn({ type: 'timestamp' })  
  createdAt: Date;
}
