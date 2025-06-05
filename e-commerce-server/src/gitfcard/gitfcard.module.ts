import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCard } from './entities/gift-card.entity';
import { GiftCardService } from './gitfcard.service';
import { GiftCardController } from './gitfcard.controller';
import { GiftCardPurchase } from './entities/gift-card-purchase.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCard, GiftCardPurchase  ]),UsersModule  ],
  controllers: [GiftCardController],
  providers: [GiftCardService],
  exports: [GiftCardService,TypeOrmModule],
})
export class GiftCardModule {}
