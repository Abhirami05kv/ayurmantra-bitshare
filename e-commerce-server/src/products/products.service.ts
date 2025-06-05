import { Injectable, NotFoundException, BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, Like } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductService {
  private readonly log: Logger = new Logger(ProductService.name);
  logger: any;

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

async findAll({
  page = 1,
  limit = 10,
  paginate = true,
  priceOrder,
  categoryId = null,
  search,
}: {
  page?: number;
  limit?: number;
  paginate?: boolean;
  priceOrder?: 'asc' | 'desc';
  categoryId?: number | null; 
  search?: string;
} = {}): Promise<{ statusCode: number; message: string; data: Product[]; total?: number }> {
  const findOptions: any = {
    relations: ['category'], 
    select: ['id', 'name', 'price', 'stock', 'imageUrls', 'description', 'status', 'createdAt'], 
    where: {},
    order: {
      createdAt: 'DESC', 
    },
  };

  
  if (paginate) {
    findOptions.skip = (page - 1) * limit;
    findOptions.take = limit;
  }

  
  if (priceOrder) {
    findOptions.order.price = priceOrder;
  }

  
  if (categoryId !== null && categoryId !== undefined) {
    findOptions.where = { ...findOptions.where, category: { id: categoryId } };
  }

  
  if (search) {
    findOptions.where = { 
      ...findOptions.where, 
      name: Like(`%${search}%`) 
    };
  }

  const [products, total] = await this.productRepository.findAndCount(findOptions);

  return {
    statusCode: 200,
    message: 'Products fetched successfully',
    data: products,
    ...(paginate && { total }), // Only include 'total' when pagination is enabled
  };
}



  async findOne(id: number): Promise<{ statusCode: number; message: string; data?: Product }> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
      select: ['id', 'name', 'description', 'price', 'stock', 'status', 'imageUrls', 'categoryId'],
    });
  
    if (!product) {
      return {
        statusCode: 404,
        message: `Product with ID ${id} not found`,
      };
    }
  
    return {
      statusCode: 200,
      message: 'Product fetched successfully',
      data: {
          ...product,
          
      },
  };
  }
  

  async createProduct(createProductDto: CreateProductDto, 
    
  ): Promise<{ statusCode: number; message: string; data?: Product }> {

    const { name, price, stock, categoryId,imageUrls , description, status = 'active' } = createProductDto;

    console.log('Received DTO in Service:', createProductDto); // Debugging
  
    // Validate inputs
    const priceNum = parseFloat(Number(price).toFixed(2)); 
    const stockNum = Number(stock);
    const categoryIdNum = Number(categoryId);
  
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new BadRequestException('Product name is required and must be a non-empty string.');
    }
  
    if (isNaN(priceNum) || priceNum <= 0) {
      throw new BadRequestException('Price must be a positive number.');
    }
  
    if (isNaN(stockNum) || stockNum < 0) {
      throw new BadRequestException('Stock must be a non-negative number.');
    }
  
    if (!categoryId || isNaN(categoryIdNum)) {
      throw new BadRequestException('Category ID is required and must be a number.');
    }
  
    // Check if the category exists
    const category = await this.categoryRepository.findOne({ where: { id: categoryIdNum } });
    if (!category) {
      return {
        statusCode: 404,
        message: `Category with ID ${categoryId} not found`,
      };
    }
  
    // Check if a product with the same name and category already exists
    const existingProduct = await this.productRepository.findOne({
      where: { name: name.trim(), categoryId: category.id },
    });
  
    if (existingProduct) {
      return {
        statusCode: 409, // Conflict
        message: `Product with name "${name.trim()}" already exists in the "${category.name}" category`,
      };
    }
  
    // Create and save the product
    const product = this.productRepository.create({
      name: name.trim(),
      description,
      price: priceNum,
      stock: stockNum,
      imageUrls: imageUrls,
      status,
      category,
    });
  
    const savedProduct = await this.productRepository.save(product);
  
    return {
      statusCode: 201, // Created
      message: 'Product created successfully!',
      data: savedProduct,
    };
  } 

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    image?: Express.Multer.File,
  ): Promise<{ statusCode: number; message: string; data?: Product }> {
    const response = await this.findOne(id);
  
    if (response.statusCode !== 200) {
      return { statusCode: response.statusCode, message: response.message };
    }
  
    const product = response.data!;
  
    if (!updateProductDto || Object.keys(updateProductDto).length === 0) {
      throw new BadRequestException('Fill at least one field to update');
    }
  
    // If a new image is uploaded, update the image URL
    if (image) {
      const baseUrl = '/uploads/products/';
      updateProductDto.imageUrls = `${baseUrl}${image.filename}`;
    }
  
    if (updateProductDto.price !== undefined) {
      updateProductDto.price = parseFloat(Number(updateProductDto.price).toFixed(2));
    }
  
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: updateProductDto.categoryId } });
      if (!category) {
        return { statusCode: 404, message: 'Category not found' };
      }
      product.category = category;
    }
  
    Object.assign(product, updateProductDto);
    const updatedProduct = await this.productRepository.save(product);
  
    return { statusCode: 200, message: 'Product updated successfully', data: updatedProduct };
  }
  
  
  async orderProduct(id: number, quantity: number): Promise<{ statusCode: number; message: string; data?: Product }> {
    const response = await this.findOne(id);
  
    if (response.statusCode !== 200) {
      return { statusCode: response.statusCode, message: response.message };
    }
  
    const product = response.data!;
  
    if (product.stock < quantity) {
      return { statusCode: 400, message: 'Not enough stock available' };
    }
  
    product.stock -= quantity;
    const updatedProduct = await this.productRepository.save(product);
  
    return { statusCode: 200, message: 'Order placed successfully', data: updatedProduct };
  }
  
  async filterByPrice(orderByPrice: 'asc' | 'desc'): Promise<{ statusCode: number; message: string; data: Product[] }> {
    if (orderByPrice !== 'asc' && orderByPrice !== 'desc') {
      return { statusCode: 400, message: 'Invalid order parameter. Use "asc" or "desc"', data: [] };
    }
  
    const products = await this.productRepository.find({
      order: { price: orderByPrice.toUpperCase() as 'ASC' | 'DESC' },
      relations: ['category'],
    });
  
    return { statusCode: 200, message: 'Products filtered by price', data: products };
  }
  
  async addStock(id: number, quantity: number): Promise<{ statusCode: number; message: string; data?: Product | string }> {
    const response = await this.findOne(id);
  
    if (response.statusCode !== 200) {
      return { statusCode: response.statusCode, message: response.message };
    }
  
    const product = response.data!;
  
    if (product.stock <= 0) {
      return { statusCode: 400, message: 'Out of stock', data: 'Out of stock' };
    }
  
    product.stock += quantity;
    const updatedProduct = await this.productRepository.save(product);
  
    return { statusCode: 200, message: 'Stock updated successfully', data: updatedProduct };
  }
  
  }