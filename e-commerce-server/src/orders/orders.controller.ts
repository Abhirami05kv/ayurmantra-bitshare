import { Controller, Post, Body, Req, UseGuards, BadRequestException, UnauthorizedException, Get, Patch, Param, Put, Query, ParseIntPipe, NotFoundException, InternalServerErrorException, ForbiddenException, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from '../orders/orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/auth.entity';
import { Request } from 'express';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { FastifyReply } from 'fastify';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftCard } from 'src/gitfcard/entities/gift-card.entity';
import { Repository } from 'typeorm';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService,
     @InjectRepository(GiftCard)
        private readonly giftCardRepository: Repository<GiftCard>,
  ) {}

  

//  @UseGuards(AuthGuard('jwt'))
// @Post('create')
// async createOrder(@Req() req, @Body() createOrderDto: CreateOrderDto) {
//     console.log('Request User:', req.user);

//     const user = req.user as User;
//     if (!user || !user.id) {
//         throw new UnauthorizedException({
//             statusCode: 401,
//             message: 'User authentication failed.',
//         });
//     }

//     console.log('Creating order for user ID:', user.id);
//     console.log('Received Products:', createOrderDto.products);

//     if (!createOrderDto.products || createOrderDto.products.length === 0) {
//         throw new BadRequestException({
//             statusCode: 400,
//             message: 'At least one product must be included in the order.',
//         });
//     }

//     try {
//         const orderResponse = await this.orderService.createOrder(
//             user,
//             createOrderDto,
//         );

//         return {
//             statusCode: 201,
//             message: 'Order created successfully',
//             orderId: orderResponse.orderId,
//             data: orderResponse.orderDetails,
//         };
//     } catch (error) {
//         console.error('Error creating order:', error);

//         // Handle specific error types
//         if (error instanceof BadRequestException) {
//             throw new BadRequestException({
//                 statusCode: error.getStatus(),
//                 message: error.message || 'Invalid request data.',
//             });
//         } else if (error instanceof NotFoundException) {
//             throw new NotFoundException({
//                 statusCode: error.getStatus(),
//                 message: error.message || 'Resource not found.',
//             });
//         } else if (error instanceof UnauthorizedException) {
//             throw new UnauthorizedException({
//                 statusCode: error.getStatus(),
//                 message: error.message || 'User authentication failed.',
//             });
//         } else {
//             // Handle unexpected errors
//             throw new BadRequestException({
//                 statusCode: 400,
//                 message: 'An error occurred while creating the order.',
//             });
//         }
//     }
// }
@UseGuards(AuthGuard('jwt'))
@Post('create')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
async createOrder(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    console.log('Request User:', req.user);

    const user = req.user as any;
    if (!user?.id) {
        throw new UnauthorizedException({
            statusCode: 401,
            message: 'User authentication failed.',
        });
    }

    console.log('Creating order for user ID:', user.id);

    try {
        // ✅ Correct: Passing both user & createOrderDto instance
        const orderResponse = await this.orderService.createOrder(user, createOrderDto);

        return {
            statusCode: 201,
            message: 'Order created successfully',
            orderId: orderResponse.orderId,
            data: orderResponse.orderDetails,
        };
    } catch (error) {
        console.error('Error creating order:', error);

        const response = error.getResponse?.() ?? {};
        const statusCode = error.getStatus?.() ?? 400;

        throw new BadRequestException({
            statusCode,
            message: response.message || 'An error occurred while creating the order.',
        });
    }
}





//   @UseGuards(AuthGuard('jwt'))
//   @Get('my-orders')
//   async getUserOrders(@Req() req: Request & { user: User }) {
//     if (!req.user) {
//       throw new UnauthorizedException({
//         statusCode: 401,
//         message: 'User authentication failed.',
//       });
//     }

//     try {
//       const orderResponse = await this.orderService.getUserOrders(req.user);

//       return {
//         statusCode: 200,
//         success: true,
//         message: orderResponse.message,
//         orders: orderResponse.orders,
//       };
//     } catch (error) {
//       console.error('Error retrieving user orders:', error);

//       if (error instanceof NotFoundException) {
//         throw new NotFoundException({
//           statusCode: 404,
//           message: error.message || 'No orders found for this user.',
//         });
//       }

//     throw new InternalServerErrorException({
//       statusCode: 500,
//       message: 'An unexpected error occurred while retrieving orders.',
//     });
//   }
// }
@UseGuards(AuthGuard('jwt'))
@Get('my-orders')
async getUserOrders(@Req() req: Request & { user: User }) {
    if (!req.user) {
        throw new UnauthorizedException({
            statusCode: 401,
            message: 'User authentication failed.',
        });
    }

    try {
        const orderResponse = await this.orderService.getUserOrders(req.user);

        return {
            statusCode: 200,
            success: true,
            message: orderResponse.message,
            orders: orderResponse.orders,
            giftCards: orderResponse.giftCards, 
        };
    } catch (error) {
        console.error('Error retrieving user orders:', error);

        if (error instanceof NotFoundException) {
            throw new NotFoundException({
                statusCode: 404,
                message: error.message || 'No orders found for this user.',
            });
        }

        throw new InternalServerErrorException({
            statusCode: 500,
            message: 'An unexpected error occurred while retrieving orders.',
        });
    }
}


  @Get()
  async getAllOrders(
    @Query('userId') userId?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.orderService.getAllOrders(
      userId ? Number(userId) : undefined,
      startDate,
      endDate,
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId', ParseIntPipe) orderId: number) {
    console.log(`Fetching order details for order ID: ${orderId}`);

    try {
      return await this.orderService.getOrderById(orderId);
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new BadRequestException(error.message || 'Error fetching order');
    }
  }

  @Put(':orderId/status')
  async updateOrderStatus(
    @Param('orderId') orderId: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(
      orderId,
      updateOrderStatusDto.status,
    );
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('/return-request/:orderId')
  async requestReturn(
    @Param('orderId') orderId: number,
    @Body('reason') reason: string,
    @Req() req,
  ) {
    return this.orderService.requestReturnOrder(orderId, reason, req.user);
  }
  
  @Patch('/return-order/approve/:id')
async approveReturnRequest(
  @Param('id') requestId: number,
  @Body('status') status: string
) {
  const isApproved = status === 'APPROVED'; 
  return this.orderService.processReturnApproval(requestId, isApproved);
}

@Get(':orderId/invoice')
async getInvoice(@Param('orderId') orderId: number, @Res() res: FastifyReply) {
  try {
    const pdfBuffer = await this.orderService.generateInvoice(orderId);

    
    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', `attachment; filename="invoice_${orderId}.pdf"`);

    
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send({ message: 'Error generating invoice', error: error.message });
  }
}

@Put(':orderId/payment-status')
async updatePaymentStatus(
  @Param('orderId') orderId: number,
  @Body('paymentStatus') paymentStatus: string
) {
  return this.orderService.updatePaymentStatus(orderId, paymentStatus);
}
  }
  


