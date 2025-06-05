import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
  Param,
  Patch,
  Put,
  NotFoundException,
  UploadedFiles,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { GiftCardService } from './gitfcard.service';
import { CreateGiftCardDto } from './dto/create-giftcard.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateGiftCardDto } from './dto/update-giftcard.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PurchaseGiftCardDto } from './dto/purchasegift.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/gift-cards')
export class GiftCardController {
  constructor(private readonly giftCardService: GiftCardService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/gift-cards',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() createGiftCardDto: CreateGiftCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      let imagePath = '';

      if (file) {
        const baseUrl = '/uploads/gift-cards/';
        imagePath = `${baseUrl}${file.filename}`;
        console.log(`File uploaded: ${file.originalname}, Image Path: ${imagePath}`);
      }

      const giftCard = await this.giftCardService.createGiftCard(
        createGiftCardDto,
        imagePath,
      );

      return giftCard;
    } catch (error) {
      console.error('Gift card creation error:', error);
      throw new BadRequestException(error.message || 'Failed to create gift card');
    }
  }

  // @Post('use')
  // async useGiftCard(@Body('code') code: string) {
  //   return this.giftCardService.useGiftCard(code);
  // }

  @Get('all')
  async getAllGiftCards() {
    try {
      return await this.giftCardService.findAll(); // Call `findAll` from service
    } catch (error) {
      console.error('Error fetching gift cards:', error);
      throw new BadRequestException(error.message || 'Failed to fetch gift cards');
    }
  }

  @Get(':id')
  async getGiftCardById(@Param('id') id: string) {
    try {
      return await this.giftCardService.findOne(Number(id)); // Call `findOne` from service
    } catch (error) {
      console.error(`Error fetching gift card with ID ${id}:`, error);
      throw new BadRequestException(error.message || 'Failed to fetch gift card');
    }
  }

  @Put('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'image', maxCount: 1 }],
      {
        storage: diskStorage({
          destination: './uploads/giftcards',
          filename: (req, file, cb) => {
            console.log('File received for update:', file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
        limits: { fileSize: 20 * 1024 * 1024 }, 
      }
    )
  )
  async updateGiftCard(
    @Param('id') id: string,
    @Body() updateGiftCardDto: UpdateGiftCardDto,
    @UploadedFiles() files: { image?: Express.Multer.File[] },
  ) {
    try {
      let image = files?.image?.length ? files.image[0] : undefined;
  
      const response = await this.giftCardService.updateGiftCard(+id, updateGiftCardDto, image);
  
      if (response.statusCode !== 200 || !response.data) {
        throw new NotFoundException(response.message);
      }
  
      return {
        statusCode: response.statusCode,
        message: response.message,
        data: {
          ...response.data,
          image: response.data.image ? response.data.image : '',
        },
      };
    } catch (error) {
      console.error('Gift Card update error:', error);
      throw new BadRequestException(error.message || 'Failed to update gift card');
    }
  }

  @Delete('delete/:id')
  async deleteGiftCard(@Param('id') id: string) {
    try {
      const response = await this.giftCardService.deleteGiftCard(Number(id));

      if (response.statusCode !== 200) {
        throw new NotFoundException(response.message);
      }

      return response;
    } catch (error) {
      console.error('Gift Card deletion error:', error);
      throw new BadRequestException(error.message || 'Failed to delete gift card');
    }
  }
@Post('purchase')
@UseGuards(JwtAuthGuard)
async purchaseGiftCard(
  @Body() purchaseGiftCardDto: PurchaseGiftCardDto,
  @Req() req
) {
  const userId = req.user.id; 
  return this.giftCardService.purchaseGiftCard(purchaseGiftCardDto, userId);
}

// @Post('purchase')
// @UseGuards(JwtAuthGuard)
// async purchaseGiftCard(
//   @Body() purchaseGiftCardDto: PurchaseGiftCardDto,
//   @Req() req
// ) {
//   const userId = req.user.id;
//   return this.giftCardService.purchaseGiftCard(purchaseGiftCardDto, userId);
// }

// @Post('update-payment-status')
// @UseGuards(JwtAuthGuard)
// async updateGiftCardPaymentStatus(
//   @Body() updatePaymentDto: { purchaseId: number; status: 'completed' | 'failed' },
//   @Req() req
// ) {
//   const userId = req.user.id;
//   return this.giftCardService.updatePaymentStatus(updatePaymentDto.purchaseId, updatePaymentDto.status, userId);
// }
}



