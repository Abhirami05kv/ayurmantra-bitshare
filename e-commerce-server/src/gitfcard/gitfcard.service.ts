import { BadRequestException, ConflictException, Get, Injectable, InternalServerErrorException, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiftCard } from '../gitfcard/entities/gift-card.entity';
import { CreateGiftCardDto } from './dto/create-giftcard.dto';
import { UpdateGiftCardDto } from './dto/update-giftcard.dto';
import { GiftCardPurchase } from './entities/gift-card-purchase.entity';
import { User } from 'src/auth/entities/auth.entity';
import { PurchaseGiftCardDto } from './dto/purchasegift.dto';
import Razorpay from 'razorpay';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GiftCardService {
  private razorpay: Razorpay;
  constructor(
    @InjectRepository(GiftCard)
    private readonly giftCardRepository: Repository<GiftCard>,
    @InjectRepository(GiftCardPurchase)
    private readonly giftCardPurchaseRepository: Repository<GiftCardPurchase>,
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_SECRET as string,
  });
  
  }

  
  async createGiftCard(
    createGiftCardDto: CreateGiftCardDto,
    imagePath: string,
  ): Promise<{ statusCode: number; message: string; data?: GiftCard }> {
    const { title, description, purchaseAmount, usableAmount } = createGiftCardDto;
  
    // Validate inputs
    const purchaseAmt = parseFloat(Number(purchaseAmount).toFixed(2));
    const usableAmt = parseFloat(Number(usableAmount).toFixed(2));
    
  
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new BadRequestException('Gift card title is required and must be a non-empty string.');
    }
  
    if (isNaN(purchaseAmt) || purchaseAmt <= 0) {
      throw new BadRequestException('Purchase amount must be a positive number.');
    }
  
    if (isNaN(usableAmt) || usableAmt <= 0) {
      throw new BadRequestException('Usable amount must be a positive number.');
    }
  
    if (usableAmt < purchaseAmt) {
      throw new BadRequestException('Usable amount must be greater than or equal to purchase amount.');
    }
  
    // if (!(expiry instanceof Date) || isNaN(expiry.getTime())) {
    //   throw new BadRequestException('Invalid expiry date format.');
    // }
  
    // Check if a gift card with the same title already exists
    const existingGiftCard = await this.giftCardRepository.findOne({
      where: { title: title.trim() },
    });
  
    if (existingGiftCard) {
      return {
        statusCode: 409, // Conflict
        message: `Gift card with title "${title.trim()}" already exists.`,
      };
    }
  
    // Create the gift card
    const giftCard = this.giftCardRepository.create({
      title: title.trim(),
      description,
      purchaseAmount: purchaseAmt, 
      usableAmount: usableAmt, 
      balance: usableAmt, 
      // expiryDate: expiry,
      image: imagePath,
     
    });
  
    // Save the gift card to the database
    const savedGiftCard = await this.giftCardRepository.save(giftCard);
  
    return {
      statusCode: 201,
      message: 'Gift card created successfully!',
      data: savedGiftCard,
    };
  }
  

  
  
  async findAll(): Promise<{ statusCode: number; message: string; data: GiftCard[] }> {
    const giftCards = await this.giftCardRepository.find({
      order: { createdAt: 'DESC' },
  });
    return {
      statusCode: 200,
      message: 'Gift cards fetched successfully',
      data: giftCards,
    };
}

async findOne(id: number): Promise<{ statusCode: number; message: string; data?: GiftCard }> {
    const giftCard = await this.giftCardRepository.findOne({ where: { id } });

    if (!giftCard) {
      return {
        statusCode: 404,
        message: `Gift card with ID ${id} not found`,
      };
    }

    return {
      statusCode: 200,
      message: 'Gift card fetched successfully',
      data: giftCard,
    };
}

async updateGiftCard(
  id: number,
  updateGiftCardDto: UpdateGiftCardDto,
  image?: Express.Multer.File,
): Promise<{ statusCode: number; message: string; data?: GiftCard }> {
  const response = await this.findOne(id);

  if (response.statusCode !== 200) {
    return { statusCode: response.statusCode, message: response.message };
  }

  const giftCard = response.data!;

  if (!updateGiftCardDto || Object.keys(updateGiftCardDto).length === 0) {
    throw new BadRequestException('Fill at least one field to update');
  }

  
  if (image) {
    const baseUrl = '/uploads/giftcards/';
    updateGiftCardDto.image = `${baseUrl}${image.filename}`;
  }

  if (updateGiftCardDto.purchaseAmount !== undefined) {
    updateGiftCardDto.purchaseAmount = parseFloat(updateGiftCardDto.purchaseAmount.toFixed(2));
  }

  if (updateGiftCardDto.usableAmount !== undefined) {
    updateGiftCardDto.usableAmount = parseFloat(updateGiftCardDto.usableAmount.toFixed(2));
  }

  // Update gift card in database
  await this.giftCardRepository.update(id, updateGiftCardDto);

  return {
    statusCode: 200,
    message: 'Gift card updated successfully',
    data: { ...giftCard, ...updateGiftCardDto }, // Return updated data
  };

}

async deleteGiftCard(id: number): Promise<{ statusCode: number; message: string }> {
  const giftCard = await this.giftCardRepository.findOne({ where: { id } });

  if (!giftCard) {
    throw new NotFoundException(`Gift Card with ID ${id} not found`);
  }

 
 
  await this.giftCardRepository.remove(giftCard);

  return { statusCode: 200, message: 'Gift Card deleted successfully' };
}

async purchaseGiftCard(
  purchaseGiftCardDto: PurchaseGiftCardDto,
  userId: number
): Promise<{ statusCode: number; message: string; purchaseId?: number; paymentStatus: string }> {
  const { giftCardId, paymentMethod } = purchaseGiftCardDto;

  // Validate gift card
  const giftCard = await this.giftCardRepository.findOne({
    where: { id: giftCardId, status: 'active' },
  });

  if (!giftCard) {
    throw new NotFoundException({
      statusCode: 404,
      message: `Gift card with ID ${giftCardId} not found.`,
    });
  }

  // Check if user already purchased this gift card
  const existingPurchase = await this.giftCardPurchaseRepository.findOne({
    where: { user: { id: userId }, giftCard: { id: giftCardId } },
  });

  if (existingPurchase) {
    throw new ConflictException({
      statusCode: 409,
      message: 'You have already purchased this gift card and cannot buy it again.',
    });
  }

  // Validate payment method
  if (!['razorpay', 'cod'].includes(paymentMethod)) {
    throw new BadRequestException({
      statusCode: 400,
      message: 'Invalid payment method. Use "razorpay" or "cod".',
    });
  }

  
  const purchase = this.giftCardPurchaseRepository.create({
    user: { id: userId },
    giftCard,
    paymentMethod,
    paymentStatus: 'pending',  
    status: 'pending',         
  });

  
  const savedPurchase = await this.giftCardPurchaseRepository.save(purchase);

  return {
    statusCode: 201,
    message: 'Gift card purchase initiated successfully! Payment pending.',
    purchaseId: savedPurchase.id,
    paymentStatus:savedPurchase.paymentStatus
    
  };
}

// async purchaseGiftCard(
//   purchaseGiftCardDto: PurchaseGiftCardDto,
//   userId: number
// ): Promise<{ statusCode: number; message: string; purchaseId?: number }> {
//   const { giftCardId, paymentMethod } = purchaseGiftCardDto;

//   // Validate gift card
//   const giftCard = await this.giftCardRepository.findOne({
//     where: { id: giftCardId, status: 'active' },
//   });

//   if (!giftCard) {
//     throw new NotFoundException({
//       statusCode: 404,
//       message: `Gift card with ID ${giftCardId} not found.`,
//     });
//   }

//   // Validate payment method
//   if (!['razorpay'].includes(paymentMethod)) {
//     throw new BadRequestException({
//       statusCode: 400,
//       message: 'Invalid payment method. Use razorpay'
//     });
//   }

//   // Ensure the gift card is not used before payment completion
//   const existingPurchase = await this.giftCardPurchaseRepository.findOne({
//     where: { giftCard, user: { id: userId } },
//   });

//   if (existingPurchase && existingPurchase.paymentStatus !== 'completed') {
//     throw new BadRequestException({
//       statusCode: 400,
//       message: 'This gift card cannot be used because payment is not completed.',
//     });
//   }

//   // Create purchase
//   const purchase = this.giftCardPurchaseRepository.create({
//     user: { id: userId },
//     giftCard,
//     paymentMethod,
//     paymentStatus: paymentMethod === 'razorpay' ? 'completed' : 'pending',
//   });

//   // Save purchase
//   const savedPurchase = await this.giftCardPurchaseRepository.save(purchase);

//   return {
//     statusCode: 201,
//     message: 'Gift card purchased successfully!.',
//     purchaseId: savedPurchase.id,
//   };
// }

// // async updatePaymentStatus(purchaseId: number, status: 'completed' | 'failed', userId: number) {
// //   // Find the purchase
// //   const purchase = await this.giftCardPurchaseRepository.findOne({
// //     where: { id: purchaseId, user: { id: userId } },
// //   });

// //   if (!purchase) {
// //     throw new NotFoundException({
// //       statusCode: 404,
// //       message: `Purchase with ID ${purchaseId} not found.`,
// //     });
// //   }

// //   if (purchase.paymentStatus === 'completed') {
// //     throw new BadRequestException({
// //       statusCode: 400,
// //       message: 'Payment already completed for this gift card.',
// //     });
// //   }

  
//   purchase.paymentStatus = status;
//   await this.giftCardPurchaseRepository.save(purchase);

//   return {
//     statusCode: 200,
//     message: `Payment status updated to ${status}.`,
//   };
// }
}
