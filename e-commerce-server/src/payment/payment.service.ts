import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import Razorpay from 'razorpay';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { GiftCard } from 'src/gitfcard/entities/gift-card.entity';
import { GiftCardPurchase } from 'src/gitfcard/entities/gift-card-purchase.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {
  private razorpay: Razorpay;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(GiftCardPurchase)
    private readonly giftcardPurchaseRepository: Repository<GiftCardPurchase>,
     @InjectRepository(GiftCard)
        private readonly giftCardRepository: Repository<GiftCard>,
  ) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID') || '';
    const keySecret =
      this.configService.get<string>('RAZORPAY_KEY_SECRET') || '';

    console.log('222222', keySecret);

    if (!keyId || !keySecret) {
      throw new Error(
        'Razorpay credentials are missing in environment variables',
      );
    }

    this.razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }


//   async createRazorpayPurchase(
//     purchaseId: string,
//     amount: number,
//     currency: string = 'INR',
// ) {
//     const options = {
//         amount: amount * 100, // Convert to paisa
//         currency,
//         receipt: `giftcard_${purchaseId}`,
//         payment_capture: 1,
//     };

//     try {
//         const razorpayOrder = await this.razorpay.orders.create(options);
//         return {
//             statusCode: 201,
//             success: true,
//             message: "Razorpay order created successfully",
//             razorpayOrderId: razorpayOrder.id,
//             orderId: purchaseId, // Return purchase ID instead of order ID
//             amount: amount,
//             currency: currency,
//         };
//     } catch (error) {
//         console.error('Error creating Razorpay order:', error);
//         throw new BadRequestException({
//             message: 'Failed to create payment order',
//         });
//     }
// }
 // For generating unique codes

async createRazorpayPurchase(
  purchaseId: string,
  amount: number,
  currency: string = 'INR',
) {
  const options = {
    amount: amount * 100,
    currency,
    receipt: `giftcard_${purchaseId}`,
    payment_capture: 1,
  };

  try {
    const razorpayOrder = await this.razorpay.orders.create(options);

    const purchase = await this.giftcardPurchaseRepository.findOne({
      where: { id: Number(purchaseId) },
    });

    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${purchaseId} not found.`);
    }

    const uniqueCode = uuidv4().split('-')[0].toUpperCase(); 
    purchase.status = 'completed';
    purchase.paymentStatus = 'completed';
    purchase.uniquecode = uniqueCode;

    await this.giftcardPurchaseRepository.save(purchase);

    return {
      statusCode: 201,
      success: true,
      message: "Razorpay order created successfully",
      razorpayOrderId: razorpayOrder.id,
      orderId: purchaseId,
      amount,
      currency,
      uniqueCode, 
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new BadRequestException({
      message: error?.error?.description || 'Failed to create payment order',
    });
  }
}

  async createRazorpayOrder(
    orderId: string,
    amount: number,
    currency: string = 'INR',
  ) {
    const options = {
      amount: amount * 100,
      currency,
      receipt: orderId,
      payment_capture: 1,
    };

    try {
      const razorpayOrder = await this.razorpay.orders.create(options);
      return {
        statusCode: 201,  
        success: true,
        message: "Razorpay order created successfully",
        razorpayOrderId: razorpayOrder.id,  
        orderId, 
        amount: amount,
        currency: currency,
      };
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new BadRequestException({
      
        message: 'Failed to create payment order',
      });
    }
}

  

  async verifyPayment(razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string): Promise<boolean> {
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET') || '';

    if (!keySecret) {
      throw new Error('Razorpay key secret is missing');
    }

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    console.log('Generated Signature:', generatedSignature);
    console.log('Received Signature:', razorpay_signature);

    if (generatedSignature === razorpay_signature) {
     
      const order = await this.orderRepository.findOne({
        where: { razorpayOrderId: razorpay_order_id },
      });
      if (order) {
        order.razorpayPaymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;
        order.paymentStatus = 'paid';
        await this.orderRepository.save(order);
        return true;
      }
  
      // **Gift Card Purchase Payment Verification**
      const purchase = await this.giftcardPurchaseRepository.findOne({
        where: { razorpayOrderId: razorpay_order_id },
      });
  
      if (purchase) {
        purchase.razorpayPaymentId = razorpay_payment_id;
        purchase.razorpaySignature = razorpay_signature;
        purchase.paymentStatus = 'completed';
        await this.giftcardPurchaseRepository.save(purchase);
        return true;
      }
  
      console.error(`No order or purchase found with Razorpay Order ID ${razorpay_order_id}.`);
      return false;
    }
  
    console.error('Payment verification failed. Invalid signature.');
    return false;
  }

  private async getPaymentIdForOrder(orderId: number): Promise<string | null> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });

    if (!order) {
        throw new Error(`Order with ID ${orderId} not found.`);
    }

    return order.razorpayPaymentId ?? null; 
}


  async processRefund(paymentMethod: string, user: any, amount: number) {
    
    const validUser = {
        id: user.id,
        email: user.email,
        name: user.name ?? user.username, 
        phone: user.phone ?? user.phoneNumber, 
        profilePic: user.profile_pic ?? user.profilePic, 
    };

    if (paymentMethod === 'razorpay') {
        
        const refund = await this.refundViaRazorpay(validUser, amount);
        return { success: refund.status === 'refunded', data: refund };

    }

    
    return { success: false, message: 'Unsupported payment method for refund.' };
}

private async refundViaRazorpay(user: any, amount: number) {
  try {
    
      const razorpay = new Razorpay({
        
          key_id: process.env.RAZORPAY_KEY_ID as string,
          key_secret: process.env.RAZORPAY_KEY_SECRET
      });
     
    

      
      const paymentId = await this.getPaymentIdForOrder(user.id);
      if (!paymentId) {
          throw new Error('Payment ID not found for refund');
      }

      
      const refund = await razorpay.payments.refund(paymentId, { amount: amount * 100 });
      console.log('Razorpay Refund Response:', refund);

      return refund;
  } catch (error) {
      console.error('Refund Error:', error);
      return { status: 'failed', error: error.message };
  }
}
}