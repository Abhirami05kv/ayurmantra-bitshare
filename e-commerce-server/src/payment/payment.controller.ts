import { Controller, Post, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { GiftCardPurchase } from 'src/gitfcard/entities/gift-card-purchase.entity';

@Controller('api/payments')
export class PaymentController {
 
  constructor(private readonly paymentService: PaymentService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(GiftCardPurchase)
    private readonly giftcardPurchaseRepo: Repository<GiftCardPurchase>,
  ) {}

  @Post('/create-payment')
async createPayment(@Body() body) {
    const { orderId } = body;

    if (!orderId) {
        throw new BadRequestException('Order ID is required');
    }
    const order = await this.orderRepository.findOne({ where: { id: orderId } });

    if (!order) {
        throw new NotFoundException('Order not found');
    }
    const razorpayResponse = await this.paymentService.createRazorpayOrder(orderId, order.totalAmount);
    order.razorpayOrderId = razorpayResponse.razorpayOrderId;  
    await this.orderRepository.save(order); 

    return {
        success: true,
        razorpayOrderId: razorpayResponse.razorpayOrderId,
        orderId: razorpayResponse.orderId,
        amount: razorpayResponse.amount,
        currency: razorpayResponse.currency,
        
    };
}

@Post('/purchase-giftcard-payment')
async createRazorpayPurchase(@Body() body) {
    const { purchaseId } = body;

    if (!purchaseId) {
        throw new BadRequestException('Purchase ID is required');
    }

    const purchase = await this.giftcardPurchaseRepo.findOne({
        where: { id: purchaseId },
        relations: ['giftCard'],
    });

    if (!purchase) {
        throw new NotFoundException('Gift card purchase not found');
    }

    if (purchase.paymentStatus === 'completed') {
        throw new BadRequestException('Payment already completed for this purchase');
    }

    const razorpayResponse = await this.paymentService.createRazorpayPurchase(
        purchaseId,
        purchase.giftCard.purchaseAmount
    );

    purchase.razorpayOrderId = razorpayResponse.razorpayOrderId;
    purchase.uniquecode = razorpayResponse.uniqueCode; 
    await this.giftcardPurchaseRepo.save(purchase);

    return {
        success: true,
        razorpayOrderId: razorpayResponse.razorpayOrderId,
        purchaseId: razorpayResponse.orderId,
        amount: razorpayResponse.amount,
        currency: razorpayResponse.currency,
        uniquecode:razorpayResponse.uniqueCode
    };
}







// @Post('/verify')
// async verifyPayment(@Body() body) {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

//   console.log('Razorpay Order ID:', razorpay_order_id);
//   console.log('Razorpay Payment ID:', razorpay_payment_id);
//   console.log('Razorpay Signature:', razorpay_signature);

//   if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//     return {
//       statusCode: 400,
//       success: false,
//       message: 'Missing required fields',
//     };
//   }

//   const isValid = await this.paymentService.verifyPayment(
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature
//   );

//   if (!isValid) {
//     return {
//       statusCode: 400,
//       success: false,
//       message: 'Invalid payment signature',
//     };
//   }

//   const order = await this.orderRepository.findOne({
//     where: { razorpayOrderId: razorpay_order_id },
//   });

//   if (!order) {
//     return {
//       statusCode: 404,
//       success: false,
//       message: 'Order not found',
//     };
//   }

//   order.paymentStatus = 'success';
//   order.razorpayPaymentId = razorpay_payment_id; 
//   await this.orderRepository.save(order);

//   return {
//     statusCode: 200,
//     success: true,
//     message: 'Payment verified successfully',
//     transactionId: razorpay_payment_id, 
//     orderId: order.id,
//   };
// }

@Post('/verify')
async verifyPayment(@Body() body) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  console.log('Razorpay Order ID:', razorpay_order_id);
  console.log('Razorpay Payment ID:', razorpay_payment_id);
  console.log('Razorpay Signature:', razorpay_signature);

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return {
      statusCode: 400,
      success: false,
      message: 'Missing required fields',
    };
  }

  const isValid = await this.paymentService.verifyPayment(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );

  if (!isValid) {
    return {
      statusCode: 400,
      success: false,
      message: 'Invalid payment signature',
    };
  }

  // **Order Payment Verification**
  const order = await this.orderRepository.findOne({
    where: { razorpayOrderId: razorpay_order_id },
  });

  if (order) {
    order.paymentStatus = 'success';
    order.razorpayPaymentId = razorpay_payment_id;
    await this.orderRepository.save(order);

    return {
      statusCode: 200,
      success: true,
      message: 'Payment verified successfully',
      transactionId: razorpay_payment_id,
      orderId: order.id,
    };
  }

  // **Gift Card Purchase Verification**
  const purchase = await this.giftcardPurchaseRepo.findOne({
    where: { razorpayOrderId: razorpay_order_id },
  });

  if (purchase) {
    purchase.paymentStatus = 'completed';
    purchase.razorpayPaymentId = razorpay_payment_id;
    await this.giftcardPurchaseRepo.save(purchase);

    return {
      statusCode: 200,
      success: true,
      message: 'Gift card purchase payment verified successfully',
      transactionId: razorpay_payment_id,
      purchaseId: purchase.id,
    };
  }

  return {
    statusCode: 404,
    success: false,
    message: 'No matching order or gift card purchase found',
  };
}


}

