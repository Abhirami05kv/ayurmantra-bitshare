import {
  Controller,Get, Post, Body, Param, Put, UseInterceptors,UploadedFiles, BadRequestException, Query, NotFoundException, } 
from '@nestjs/common';
import { ProductService } from '../products/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';


@Controller('api/products')
export class ProductsController {
  static productsController: any;
  constructor(private readonly productsService: ProductService) {}

  // @Get()
  // async findAll(
  //   @Query('page') page: string = '1',
  //   @Query('limit') limit: string = '10',
  //   @Query('paginate') paginate: string = 'true',
  //   @Query('priceOrder') priceOrder?: string,
  //   @Query('categoryId') categoryId?: string,
  //   @Query('search') search?: string,
  // ): Promise<
  //   | {
  //       data: { categoryId: number; name: string; id: number; imageUrls: string; price: number; stock: number; status: string; description: string }[];
  //       total: number;
  //     }
  //   | { categoryId: number; name: string; id: number; imageUrls: string; price: number; stock: number; status: string; description: string }[]
  // > {
  //   const pageNumber = parseInt(page, 10);
  //   const limitNumber = parseInt(limit, 10);
  //   const paginateBoolean = paginate === 'true';
  
  //   const validatedPriceOrder =
  //     priceOrder === 'asc' || priceOrder === 'desc' ? priceOrder : undefined;
  //   const categoryIdNumber = categoryId ? parseInt(categoryId, 10) : undefined;
  
  //   const products = await this.productsService.findAll({
  //     page: pageNumber,
  //     limit: limitNumber,
  //     paginate: paginateBoolean,
  //     priceOrder: validatedPriceOrder as 'asc' | 'desc' | undefined,
  //     categoryId: categoryIdNumber,
  //     search,
  //   });
  
  //   // Define your image base URL
  //   const baseUrl = '/uploads/products/';
  
  //   if (Array.isArray(products)) {
  //     return products.map((product) => ({
  //       categoryId: product.category?.id,
  //       name: product.name,
  //       id: product.id,
  //       description: product.description,
  //       imageUrls: product.imageUrls ? `${baseUrl}${product.imageUrls}` : '',
  //       price: product.price,
  //       status: product.status,
  //       stock: product.stock,
  //     }));
  //   } else {
  //     return {
  //       data: products.data.map((product) => ({
  //         categoryId: product.category?.id,
  //         name: product.name,
  //         id: product.id,
  //         description: product.description,
  //         imageUrls: product.imageUrls ? `${baseUrl}${product.imageUrls}` : '',
  //         status: product.status,
  //         price: product.price,
  //         stock: product.stock,
  //       })),
  //       total: products.total,
  //     };
  //   }
  // }
  @Get()
async findAll(
  @Query('page') page: string = '1',
  @Query('limit') limit: string = '10',
  @Query('paginate') paginate: string = 'true',
  @Query('priceOrder') priceOrder?: string,
  @Query('categoryId') categoryId?: string,
  @Query('search') search?: string,
): Promise<{
  statusCode: number;
  message: string;
  data: { categoryId: number; name: string; id: number; imageUrls: string; price: number; stock: number; status: string; description: string }[];
  total?: number;
}> {
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const paginateBoolean = paginate === 'true';

  const validatedPriceOrder =
    priceOrder === 'asc' || priceOrder === 'desc' ? priceOrder : undefined;

  
  const categoryIdNumber = categoryId ? parseInt(categoryId, 10) : null;

  const products = await this.productsService.findAll({
    page: pageNumber,
    limit: limitNumber,
    paginate: paginateBoolean,
    priceOrder: validatedPriceOrder as 'asc' | 'desc' | undefined,
    categoryId: categoryIdNumber, 
    search,
  });

  // Define your image base URL
 // const baseUrl = '/uploads/products/';

  return {
    statusCode: 200,
    message: 'Products fetched successfully',
    data: products.data.map((product) => ({
      categoryId: product.category?.id,
      name: product.name,
      id: product.id,
      description: product.description,
      imageUrls: product.imageUrls, //? `${baseUrl}${product.imageUrls}` : '',
      price: product.price,
      status: product.status,
      stock: product.stock,
    })),
    ...(paginateBoolean && { total: products.total }),
  };
}


  

    @Post('create')
    @UseInterceptors(
      FileFieldsInterceptor(
        [{ name: 'image', maxCount: 1 }], 
        {
          storage: diskStorage({
            destination: './uploads/products',
            filename: (req, file, cb) => {
              console.log(' File received by Multer:', file.originalname);
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
          }),
          limits: { fileSize: 20 * 1024 * 1024 }, 
        }
      )
    )


async create(
  @Body() createProductDto: CreateProductDto,
  @UploadedFiles() files: { image?: Express.Multer.File[] },
) {
  try {
    let imageUrls = '';

    if (files?.image?.length) {
      const file = files.image[0]; 
      const baseUrl = '/uploads/products/'; 
      imageUrls = `${baseUrl}${file.filename}`; 
      console.log(`File uploaded: ${file.originalname}, Image URL: ${imageUrls}`);
    }

    const product = await this.productsService.createProduct({
      ...createProductDto,
      imageUrls, 
    });

    return {
       product, 
    };
  } catch (error) {
    console.error('Product creation error:', error);
    throw new BadRequestException(error.message || 'Failed to create product');
  }
}

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }


  @Get(':id')
async findOne(@Param('id') id: string) {
  const response = await this.productsService.findOne(+id);

  if (response.statusCode !== 200 || !response.data) {
    throw new NotFoundException(response.message);
  }

  const baseUrl = '/uploads/products/';
  const product = response.data; 

  return {
    statusCode: response.statusCode,
    message: response.message,
    data: {
      ...product,
       
     // imageUrls: product.imageUrls ? `${baseUrl}${product.imageUrls}` : '',
    },
  };
}

//   @Get(':id')
// async findOne(@Param('id') id: string) {
//   const product = await this.productsService.findOne(+id);

//   if (!product) {
//     throw new NotFoundException(`Product with ID ${id} not found`);
//   }

//   // Define your image base URL
//   const baseUrl = '/uploads/products/';

//   return {
//     ...product,
//     imageUrls: product.imageUrls ? `${baseUrl}${product.imageUrls}` : '',
//   };
// }


  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateProductDto: UpdateProductDto,
  // ) {
  //   return this.productsService.update(id, updateProductDto);
  // }

  @Put('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'image', maxCount: 1 }], 
      {
        storage: diskStorage({
          destination: './uploads/products',
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
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: { image?: Express.Multer.File[] },
  ) {
    try {
      let image = files?.image?.length ? files.image[0] : undefined;
  
      const response = await this.productsService.updateProduct(+id, updateProductDto, image);
  
      if (response.statusCode !== 200 || !response.data) {
        throw new NotFoundException(response.message);
      }
  
      return {
        statusCode: response.statusCode,
        message: response.message,
        data: {
          ...response.data,
          imageUrls: response.data.imageUrls ? response.data.imageUrls : '',
        },
      };
    } catch (error) {
      console.error('Product update error:', error);
      throw new BadRequestException(error.message || 'Failed to update product');
    }
  }
  

//   @Put(':id')
// async update(
//   @Param('id') id: number,
//   @Body() updateProductDto: UpdateProductDto,
// ) {
//   const updatedProduct = await this.productsService.update(id, updateProductDto);

//   if (!updatedProduct) {
//     throw new NotFoundException(`Product with ID ${id} not found`);
//   }

//   // Define your image base URL
//   const baseUrl = '/uploads/products/';

//   return {
//     ...updatedProduct,
//     imageUrls: updatedProduct.imageUrls
//       ? `${baseUrl}${updatedProduct.imageUrls}`
//       : '',
//   };
// }


  // @Post('order/:id')
  // async orderProduct(
  //   @Param('id') id: string,
  //   @Body('quantity') quantity: number,
  // ) {
  //   if (!quantity || quantity <= 0) {
  //     throw new BadRequestException('Quantity must be greater than zero');
  //   }
  //   const product = await this.productsService.orderProduct(+id, quantity);
  //   if (product.stock < 1) {
  //     return { message: 'Out of stock' };
  //   }
  //   return product;
  // }
  @Post('order/:id')
async orderProduct(@Param('id') id: string, @Body('quantity') quantity: number) {
  if (!quantity || quantity <= 0) {
    throw new BadRequestException('Quantity must be greater than zero');
  }

  const response = await this.productsService.orderProduct(+id, quantity);

  if (response.statusCode !== 200 || !response.data) {
    return { statusCode: response.statusCode, message: response.message };
  }

  return response;
}


  // @Get('filterByPrice/:order')
  // async filterByPrice(
  //   @Param('order') order: 'asc' | 'desc',
  // ): Promise<{ categoryId: number; name: string; id: number }[]> {
  //   if (order !== 'asc' && order !== 'desc') {
  //     throw new BadRequestException('Invalid order parameter. Use "asc" or "desc"');
  //   }

  //   const products = await this.productsService.filterByPrice(order);
  //   return products.map((product) => ({
  //     categoryId: product.category?.id,
  //     name: product.name,
  //     id: product.id,
  //   }));
  // }
  @Get('filterByPrice/:order')
  async filterByPrice(@Param('order') order: 'asc' | 'desc') {
  if (order !== 'asc' && order !== 'desc') {
    throw new BadRequestException('Invalid order parameter. Use "asc" or "desc"');
  }

  const response = await this.productsService.filterByPrice(order);

  if (response.statusCode !== 200 || !response.data.length) {
    return { statusCode: response.statusCode, message: response.message, data: [] };
  }

  return {
    statusCode: response.statusCode,
    message: response.message,
    data: response.data.map((product) => ({
      categoryId: product.category?.id,
      name: product.name,
      id: product.id,
    })),
  };
}



  @Post('add-stock/:id')
  async addStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    if (!quantity || quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }
    const product = await this.productsService.addStock(+id, quantity);
    return product;
  }
}