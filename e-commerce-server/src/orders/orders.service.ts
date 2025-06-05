
import { Injectable, BadRequestException, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { CartService } from 'src/cart/cart.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { PaymentService } from 'src/payment/payment.service';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { OrderReturnRequest, ReturnStatus } from './order-return-request.entity';
import puppeteer from 'puppeteer';
import { GiftCard } from 'src/gitfcard/entities/gift-card.entity';
import { GiftCardPurchase } from 'src/gitfcard/entities/gift-card-purchase.entity';
import { NotificationService } from 'src/notification/notification.service';
import { UserRole } from '../auth/user-role.enum'; 





@Injectable()
export class OrderService {
 
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(OrderReturnRequest)
    private readonly returnRequestRepository: Repository<OrderReturnRequest>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly cartService: CartService,
    private readonly paymentService: PaymentService,
    private readonly notificationService: NotificationService,
    @InjectRepository(GiftCard)
    private readonly giftCardRepository: Repository<GiftCard>,
    @InjectRepository(GiftCardPurchase)
    private readonly giftCardPurchaseRepository: Repository<GiftCardPurchase>,
  ) {}

// async createOrder(user: User, createOrderDto: CreateOrderDto) {
//     if (!user || !user.id) {
//         throw new UnauthorizedException('User authentication failed.');
//     }

//     // Fetch user's cart
//     const cart = await this.cartService.getCart(user.id);
//     if (!cart || !cart.data || cart.data.length === 0) {
//         throw new BadRequestException('Your cart is empty. Please add items before placing an order.');
//     }

//     const FLAT_RATE = 50;

//     // Use total values directly from cart
//     const totalAmount = cart.grandTotal; // Use grandTotal from cart
//     const discountAmount = cart.discountAmount ? Number(cart.discountAmount) : 0;


//     const orderItemEntities: OrderItem[] = [];

//     for (const cartItem of cart.data) {
//         const product = await this.productRepository.findOne({
//             where: { id: cartItem.product.id ?? undefined } // Convert null to undefined
//         });

//         if (!product) {
//             throw new NotFoundException(`Product with ID ${cartItem.product.id} does not exist.`);
//         }
//         if (product.stock < cartItem.quantity) {
//             throw new BadRequestException(`Insufficient stock for product: ${product.name}`);
//         }

//         product.stock -= cartItem.quantity;
//         await this.productRepository.save(product);

//         const orderItem = this.orderItemRepository.create({
//             product,
//             name: product.name,
//             quantity: cartItem.quantity,
//             price: cartItem.product.price, // Use price from cart item
//             totalPrice: cartItem.itemTotal, // ✅ Fix: Use itemTotal instead of totalPrice
//         });
//         orderItemEntities.push(orderItem);
//     }

//     const userEntity = await this.userRepository.findOne({ where: { id: user.id }, select: ['id', 'name', 'email'] });
//     if (!userEntity) {
//         throw new NotFoundException('User not found.');
//     }

//     const order = this.orderRepository.create({
//         user: userEntity,
//         username: userEntity.name,
//         email: userEntity.email,
//         status: OrderStatus.PENDING,
//         totalAmount, // ✅ Now using grandTotal from cart
//         paymentMethod: createOrderDto.paymentMethod ?? 'COD', // ✅ Fixed: Get payment method from request
//         paymentStatus: 'pending',
//         date: new Date(),
//         shippingAddress: createOrderDto.shippingAddress ?? null, // ✅ Fixed: Get shipping address from request
//         coupon: cart.couponCode ? await this.couponRepository.findOne({ where: { coupon_code: cart.couponCode } }) : null, 
//         discountAmount,
//     });

//     await this.orderRepository.save(order);

//     for (const orderItem of orderItemEntities) {
//         orderItem.order = order;
//         await this.orderItemRepository.save(orderItem);
//     }

//     // Remove ordered items from the cart
//     await this.cartService.removeOrderedItems(
//         user.id, 
//         cart.data.map((item) => item.product.id).filter((id): id is number => id !== null) // ✅ Remove nulls
//     );

//     return {
//         statusCode: 201,
//         message: 'Order created successfully',
//         orderId: order.id,
//         orderDetails: {
//             email: order.email,
//             username: order.username,
//             status: order.status,
//             totalAmount: order.totalAmount,
//             discountAmount: order.discountAmount,
//             flatRate: FLAT_RATE,
//             paymentMethod: order.paymentMethod,
//             paymentStatus: order.paymentStatus,
//             date: order.date,
//             shippingAddress: order.shippingAddress,
//             products: orderItemEntities.map((item) => ({
//                 productId: item.product.id,
//                 productName: item.product.name,
//                 productPrice: item.price,
//                 quantity: item.quantity,
//                 totalProductPrice: item.totalPrice,
//             })),
//             coupon: order.coupon ? {
//                 couponCode: order.coupon.coupon_code,
//                 discountType: order.coupon.discount_type,
//                 discountValue: order.coupon.discount_value,
//             } : null,
//         },
//     };
// }
// async createOrder(user: User, createOrderDto: CreateOrderDto) {
//   if (!user || !user.id) {
//       throw new UnauthorizedException('User authentication failed.');
//   }

//   // Fetch user's cart
//   const cart = await this.cartService.getCart(user.id);
//   if (!cart || !cart.data || cart.data.length === 0) {
//       throw new BadRequestException('Your cart is empty. Please add items before placing an order.');
//   }

//   const FLAT_RATE = 50;
//   const totalAmount = cart.grandTotal;
//   const discountAmount = cart.discountAmount ? Number(cart.discountAmount) : 0;

//   const orderItemEntities: OrderItem[] = [];

//   for (const cartItem of cart.data) {
//       const product = await this.productRepository.findOne({
//           where: { id: cartItem.product.id ?? undefined }
//       });

//       if (!product) {
//           throw new NotFoundException(`Product with ID ${cartItem.product.id} does not exist.`);
//       }
//       if (product.stock < cartItem.quantity) {
//           throw new BadRequestException(`Insufficient stock for product: ${product.name}`);
//       }

//       product.stock -= cartItem.quantity;
//       await this.productRepository.save(product);

//       const orderItem = this.orderItemRepository.create({
//           product,
//           name: product.name,
//           quantity: cartItem.quantity,
//           price: cartItem.product.price,
//           totalPrice: cartItem.itemTotal,
//       });
//       orderItemEntities.push(orderItem);
//   }

//   const userEntity = await this.userRepository.findOne({ where: { id: user.id }, select: ['id', 'name', 'email'] });
//   if (!userEntity) {
//       throw new NotFoundException('User not found.');
//   }

//   let appliedCoupon: Coupon | null = null;

// if (cart.couponCode) {
//     appliedCoupon = await this.couponRepository.findOne({ where: { coupon_code: cart.couponCode } });

//     if (!appliedCoupon) {
//         throw new BadRequestException('Invalid coupon code.');
//     }
// }


//   const order = this.orderRepository.create({
//       user: userEntity,
//       username: userEntity.name,
//       email: userEntity.email,
//       status: OrderStatus.PENDING,
//       totalAmount,
//       paymentMethod: createOrderDto.paymentMethod ?? 'COD',
//       paymentStatus: 'pending',
//       date: new Date(),
//       shippingAddress: createOrderDto.shippingAddress ?? null,
//       coupon: appliedCoupon,
//       discountAmount,
//   });

//   await this.orderRepository.save(order);

//   for (const orderItem of orderItemEntities) {
//       orderItem.order = order;
//       await this.orderItemRepository.save(orderItem);
//   }

//   // Remove ordered items and coupon from the cart
//   await this.cartService.removeOrderedItems(user.id, cart.data.map((item) => item.product.id).filter((id): id is number => id !== null));
  
//   // // Ensure coupon is removed from cart after order placement
//   // cart.couponCode = null;
//   // await this.cartRepository.save(cart);

//   await this.cartRepository.update(
//     { user: { id: user.id } }, // ✅ Fix: Use object reference
//     { 
//         couponCode: null,     // ✅ Remove applied coupon
//         discountAmount: 0     // ✅ Reset discount amount
//     }
// );


//   return {
//       statusCode: 201,
//       message: 'Order created successfully',
//       orderId: order.id,
//       orderDetails: {
//           email: order.email,
//           username: order.username,
//           status: order.status,
//           totalAmount: order.totalAmount,
//           discountAmount: order.discountAmount,
//           flatRate: FLAT_RATE,
//           paymentMethod: order.paymentMethod,
//           paymentStatus: order.paymentStatus,
//           date: order.date,
//           shippingAddress: order.shippingAddress,
//           products: orderItemEntities.map((item) => ({
//               productId: item.product.id,
//               productName: item.product.name,
//               productPrice: item.price,
//               quantity: item.quantity,
//               totalProductPrice: item.totalPrice,
//           })),
//           coupon: order.coupon ? {
//               couponCode: order.coupon.coupon_code,
//               discountType: order.coupon.discount_type,
//               discountValue: order.coupon.discount_value,
//           } : null,
//       },
//   };
// }

async createOrder(user: User, createOrderDto: CreateOrderDto) {
  if (!user || !user.id) {
      throw new UnauthorizedException('User authentication failed.');
  }

  // ✅ Fetch user's cart with the latest grandTotal
  const cart = await this.cartService.getCart(user.id);
  if (!cart || !cart.data || cart.data.length === 0) {
      throw new BadRequestException('Your cart is empty. Please add items before placing an order.');
  }

  // ✅ Fetch latest grandTotal directly from cart
  const latestGrandTotal = cart.grandTotal;

  const orderItemEntities: OrderItem[] = [];

  for (const cartItem of cart.data) {
      const product = await this.productRepository.findOne({
          where: { id: cartItem.product.id ?? undefined }
      });

      if (!product) {
          throw new NotFoundException(`Product with ID ${cartItem.product.id} does not exist.`);
      }
      if (product.stock < cartItem.quantity) {
          throw new BadRequestException(`Insufficient stock for product: ${product.name}`);
      }

      product.stock -= cartItem.quantity;
      await this.productRepository.save(product);

      const orderItem = this.orderItemRepository.create({
          product,
          name: product.name,
          quantity: cartItem.quantity,
          price: cartItem.product.price,
          totalPrice: cartItem.itemTotal,
      });
      orderItemEntities.push(orderItem);
  }

  const userEntity = await this.userRepository.findOne({ where: { id: user.id }, select: ['id', 'name', 'email'] });
  if (!userEntity) {
      throw new NotFoundException('User not found.');
  }

  //  Fetch coupon (if applied)
  let appliedCoupon: Coupon | null = null;
  if (cart.couponCode) {
      appliedCoupon = await this.couponRepository.findOne({ where: { coupon_code: cart.couponCode } });

      if (!appliedCoupon) {
          throw new BadRequestException('Invalid coupon code.');
      }
  }

  //  Fetch gift card (if applied)
  let appliedGiftCard: GiftCardPurchase | null = null;
  if (cart.giftcardCode) {
      appliedGiftCard = await this.giftCardPurchaseRepository.findOne({ where: { uniquecode: cart.giftcardCode } });

      if (!appliedGiftCard) {
          throw new BadRequestException('Invalid gift card code.');
      }
  }

  //  Create order with latest grandTotal
  const order = this.orderRepository.create({
      user: userEntity,
      username: userEntity.name,
      email: userEntity.email,
      status: OrderStatus.PENDING,
      totalAmount: latestGrandTotal,  
      paymentMethod: createOrderDto.paymentMethod ?? 'COD',
      paymentStatus: 'pending',
      date: new Date(),
      shippingAddress: createOrderDto.shippingAddress ?? null,
      coupon: appliedCoupon,
      discountAmount: cart.discountAmount? Number(cart.discountAmount) : 0, 
      giftcardCode: cart.giftcardCode ?? undefined, 
      giftCardDiscount: cart.giftcardDiscountAmount ? Number(cart.giftcardDiscountAmount) : 0, 
  });

  await this.orderRepository.save(order);

  for (const orderItem of orderItemEntities) {
      orderItem.order = order;
      await this.orderItemRepository.save(orderItem);
  }

  
  await this.cartService.removeOrderedItems(
      user.id,
      cart.data.map((item) => item.product.id).filter((id): id is number => id !== null)
  );

  
  await this.cartRepository.update(
      { user: { id: user.id } }, 
      { 
          couponCode: null,    
          discountAmount: 0,   
          giftcardCode: null,  
          giftcardDiscountAmount: 0, 
      }
  );

  await this.notificationService.sendOrderNotificationToAdmins(order, userEntity);
  
  return {
      statusCode: 201,
      message: 'Order created successfully',
      orderId: order.id,
    

      
      orderDetails: {
          email: order.email,
          username: order.username,
          status: order.status,
          totalAmount: order.totalAmount,
          discountAmount: order.discountAmount,
          giftcardDiscountAmount: order.giftCardDiscount,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          date: order.date,
          shippingAddress: order.shippingAddress,
          products: orderItemEntities.map((item) => ({
              productId: item.product.id,
              productName: item.product.name,
              productPrice: item.price,
              quantity: item.quantity,
              totalProductPrice: item.totalPrice,
          })),
          coupon: order.coupon ? {
              couponCode: order.coupon.coupon_code,
              discountType: order.coupon.discount_type,
              discountValue: order.coupon.discount_value,
          } : null,
          giftCard: appliedGiftCard ? {
              giftCardCode: appliedGiftCard.uniquecode,
              discountAmount: cart.giftcardDiscountAmount, 
          } : null,
      },
  };
}





async getUserOrders(user: User) {
    if (!user || !user.id) {
        throw new UnauthorizedException({
            statusCode: 401,
            message: 'User authentication failed.',
        });
    }

    
    const orders = await this.orderRepository.find({
        where: { email: user.email },
        relations: ['orderItems', 'orderItems.product', 'giftCardPurchases', 'giftCardPurchases.giftCard'],
        order: { createdAt: 'DESC' },
    });

    
    const giftCardPurchases = await this.giftCardPurchaseRepository.find({
        where: { user: { id: user.id } }, // Fetch based on user ID
        relations: ['giftCard'],
    });

    
    if (!orders.length && !giftCardPurchases.length) {
        throw new NotFoundException({
            statusCode: 404,
            message: 'No orders or gift card purchases found for this user.',
        });
    }

    return {
        statusCode: 200,
        success: true,
        message: 'Orders and Gift Card Purchases retrieved successfully',
        orders: orders.map(order => ({
            orderId: order.id,
            date: order.date,
            status: order.status,
            totalAmount: order.totalAmount,
            paymentMethod: order.paymentMethod,
            products: [
                ...order.orderItems.map(item => ({
                    productId: item.product.id,
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.totalPrice,
                })),
                ...(order.giftCardPurchases?.map(giftCardPurchase => ({
                    productId: `GIFT-${giftCardPurchase.id}`,
                    name: `Gift Card - ${giftCardPurchase.giftCard?.title || 'No Title'}`,
                    quantity: 1,
                    price: giftCardPurchase.purchaseAmount ?? 0,
                    totalPrice: giftCardPurchase.purchaseAmount ?? 0,
                    uniqueCode: giftCardPurchase.uniquecode,
                    status: giftCardPurchase.paymentStatus,
                    expiryDate: giftCardPurchase.giftCard?.expiryDate ?? null,
                    balance: giftCardPurchase.giftCard?.balance ?? 0,
                })) || []),
            ],
        })),
        giftCards: giftCardPurchases.map(purchase => ({
            giftCardPurchaseId: purchase.id,  
            giftCardId: purchase.giftCard?.id ?? null,
            title: purchase.giftCard?.title || 'No Title',
            purchaseAmount: purchase.purchaseAmount ?? 0,
            balance: purchase.giftCard?.balance ?? 0,
            uniqueCode: purchase.uniquecode,
            purchaseDate: purchase.purchaseDate,
            isRedeemed: purchase.giftCard?.is_redeemed ?? false,
        })),
    };
}




async getAllOrders(userId?: number, startDate?: string, endDate?: string, page: number = 1, limit: number = 10) {
  const query = this.orderRepository.createQueryBuilder('order')
    .leftJoinAndSelect('order.orderItems', 'orderItem')
    .leftJoinAndSelect('orderItem.product', 'product')
    .addSelect('order.shippingAddress')  
    .orderBy('order.createdAt', 'DESC');

  // Filter by userId
  if (userId) {
    query.andWhere('order.userId = :userId', { userId });
  }

  // Filter by date range
  if (startDate && endDate) {
    query.andWhere('order.date BETWEEN :startDate AND :endDate', { startDate, endDate });
  } else if (startDate) {
    query.andWhere('order.date >= :startDate', { startDate });
  } else if (endDate) {
    query.andWhere('order.date <= :endDate', { endDate });
  }

  // Ensure valid page and limit values
  page = page > 0 ? page : 1;
  limit = limit > 0 ? limit : 10;

  // Apply pagination correctly
  query.take(limit).skip((page - 1) * limit);

  const [orders, total] = await query.getManyAndCount();

  return {
    statusCode: 200,
    success: true,
    message: 'Filtered orders retrieved successfully',
    totalOrders: total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    orders,
  };
}



async getOrderById(orderId: number) {
  console.log(`Fetching order with ID: ${orderId}`);

  const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'orderItems', 'orderItems.product', 'orderItems.product.category'],
      select: ['id', 'username', 'email', 'status', 'totalAmount', 'date', 'shippingAddress', 'paymentMethod', 'paymentStatus'], 
  });

  if (!order) {
      throw new NotFoundException({
          statusCode: 404,
          message: `Order with ID ${orderId} not found.`,
      });
  }

  return {
      statusCode: 200,
      message: 'Order retrieved successfully',
      data: order,
  };
}


  async updateOrderStatus(orderId: number, status: OrderStatus) {
    const order = await this.orderRepository.findOne({ where: { id: orderId } })
    
  
    if (!order) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Order with ID ${orderId} not found.`,
      });
    }
  
    order.status = status;
    await this.orderRepository.save(order);
  
    return {
      statusCode: 200,
      success: true,
      message: `Order status updated successfully to ${status}`,
      order: {
          id: order.id,
          username: order.user?.username,  
          email: order.email,
          status: order.status,
      },
  };
  }
  async requestReturnOrder(orderId: number, reason: string, user: User) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, user: { id: user.id } },
      relations: ['user'],
    });
  
    if (!order) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Order with ID ${orderId} not found.`,
      });
    }
  
    if (order.status !== OrderStatus.DELIVERED) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Only delivered orders can be returned.',
      });
    }
  
    const existingRequest = await this.returnRequestRepository.findOne({
      where: { order: { id: orderId }, status: ReturnStatus.PENDING },
    });
  
    if (existingRequest) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Return request is already pending for this order.',
      });
    }
  
    const returnRequest = this.returnRequestRepository.create({
      order,
      user,
      reason,
      status: ReturnStatus.PENDING,
    });
  
    await this.returnRequestRepository.save(returnRequest);
  
    return {
      statusCode: 201,
      message: 'Return request submitted successfully. Awaiting admin approval.',
      requestId: returnRequest.id,
    };
  }

  async processReturnApproval(requestId: number, approved: boolean) {
    const returnRequest = await this.returnRequestRepository.findOne({
        where: { id: requestId },
        relations: ['order', 'user'],
    });

    if (!returnRequest) {
        throw new NotFoundException({
            statusCode: 404,
            message: `Return request with ID ${requestId} not found.`,
        });
    }

    if (returnRequest.status !== ReturnStatus.PENDING) {
        throw new BadRequestException({
            statusCode: 400,
            message: 'Return request has already been processed.',
        });
    }

    if (approved) {
        returnRequest.status = ReturnStatus.APPROVED;
        returnRequest.order.status = OrderStatus.RETURN;

        const order = returnRequest.order;
        const user = returnRequest.user;
        const refundAmount = order.totalAmount;

        // Process refund
        const refundResponse = await this.paymentService.processRefund(order.paymentMethod, user, refundAmount);

        if (!refundResponse.success) {
            return {
                statusCode: 500,
                message: 'Return request approved, but refund processing failed.',
            };
        }
    } else {
        returnRequest.status = ReturnStatus.REJECTED;
    }

    await this.returnRequestRepository.save(returnRequest);
    await this.orderRepository.save(returnRequest.order);

    return {
        statusCode: 200,
        message: `Return request ${approved ? 'approved' : 'rejected'} successfully.`,
    };
}




async generateInvoice(orderId: number): Promise<Buffer> {
  const order = await this.orderRepository.findOne({
    where: { id: orderId },
    relations: ['orderItems', 'coupon'], 
    select: ['id', 'createdAt', 'username', 'shippingAddress', 'totalAmount', 'discountAmount'],
  });

  if (!order) {
    throw new NotFoundException('Order not found');
  }

  console.log('Shipping Address:', order.shippingAddress);

  let finalTotalAmount = 0;

  const orderItemsHtml = order.orderItems
    .map((item) => {
      const discountAmount = item.discountAmount || 0;
      const discountedPrice = item.price - discountAmount;
      const itemTotal = discountedPrice * item.quantity;

      finalTotalAmount += itemTotal;

      return `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>₹${item.price}</td>
          
          <td>₹${itemTotal}</td>
        </tr>
      `;
    })
    .join('');

 
  const couponDiscount = order.discountAmount || 0; 
  const couponType = order.coupon ? order.coupon.discount_type : null; 
  const couponValue = order.coupon
    ? order.coupon.discount_type === 'percentage'
      ? `${order.coupon.discount_value}%`
      : `₹${order.coupon.discount_value}`
    : 'N/A';

 
  const FLAT_RATE = 50;
  const finalPayableAmount = finalTotalAmount - couponDiscount + FLAT_RATE;
  const invoiceHtml = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .details { text-align: left; }
        .title { text-align: center; font-size: 24px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 10px; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="details">
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Customer:</strong> ${order.username ?? 'N/A'}</p>
          <p><strong>Shipping Address:</strong> 
            ${order.shippingAddress?.street ?? 'N/A'}, 
            ${order.shippingAddress?.city ?? 'N/A'}, 
            ${order.shippingAddress?.state ?? 'N/A'}, 
            ${order.shippingAddress?.country ?? 'N/A'} - 
            ${order.shippingAddress?.zipCode ?? 'N/A'}
          </p> 
        </div>
      </div>

      <h2 class="title">Invoice</h2>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          ${orderItemsHtml}
        </tbody>
      </table>

      <div class="total">
        <p><strong>Subtotal: ₹${finalTotalAmount.toFixed(2)}</strong></p>
        <p><strong>Coupon Applied: ${couponType ? couponType.toUpperCase() : 'N/A'} (${couponValue})</strong></p>
        <p><strong>Flat Rate Charge: ₹${FLAT_RATE.toFixed(2)}</strong></p>
        <p><strong>Total Amount to Pay: ₹${finalPayableAmount.toFixed(2)}</strong></p>
      </div>

      <div class="footer">
        <p>Thank you for your purchase!</p>
      </div>
    </body>
    </html>
  `;

  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(invoiceHtml, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return Buffer.from(pdfBuffer);
}

async updatePaymentStatus(orderId: number, paymentStatus: string) {
  const order = await this.orderRepository.findOne({ where: { id: orderId }, relations: ['giftCard'] });

  if (!order) {
      throw new NotFoundException('Order not found.');
  }

  order.paymentStatus = paymentStatus;

  
  if (paymentStatus === 'paid' && order.giftCard) {
      order.giftCard.is_redeemed = true;
      await this.giftCardRepository.save(order.giftCard);
      console.log("Gift card marked as redeemed.");
  }

  await this.orderRepository.save(order);
  return { message: `Payment status updated to ${paymentStatus}` };
}

}

  