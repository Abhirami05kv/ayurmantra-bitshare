import { forwardRef, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from 'src/orders/orders.module';
import { GiftCardModule } from 'src/gitfcard/gitfcard.module';


@Module({
  imports: [ConfigModule, forwardRef(() => OrdersModule),forwardRef(() => GiftCardModule),
    
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],

})
export class PaymentModule {}
