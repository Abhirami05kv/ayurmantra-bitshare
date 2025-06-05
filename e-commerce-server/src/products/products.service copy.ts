// import { Injectable, NotFoundException, BadRequestException, ConflictException, Logger } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Product } from './entities/product.entity';
// import { Repository, Like } from 'typeorm';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { Category } from 'src/categories/entities/category.entity';

// @Injectable()
// export class ProductService {
//   private readonly log: Logger = new Logger(ProductService.name);
//   logger: any;

//   constructor(
//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>,

//     @InjectRepository(Category)
//     private readonly categoryRepository: Repository<Category>,
//   ) {}

//   async findAll({ page = 1, limit = 10, paginate = true, priceOrder, categoryId, search }: { page?: number; limit?: number; paginate?: boolean; priceOrder?: 'asc' | 'desc'; categoryId?: number; search?: string; } = {}): Promise<{ data: Product[]; total: number } | Product[]> {
//     const findOptions: any = {
//       relations: ['category'],
//       select: ['id', 'name', 'price', 'stock', 'imageUrls', 'description', 'status'],
//       where: {},
//     };

//     if (paginate) {
//       findOptions.skip = (page - 1) * limit;
//       findOptions.take = limit;
//     }

//     if (priceOrder) {
//       findOptions.order = { price: priceOrder };
//     }

//     if (categoryId) {
//       findOptions.where.category = { id: categoryId };
//     }

//     if (search) {
//       findOptions.where.name = Like(`%${search}%`);
//     }

//     const [products, total] = await this.productRepository.findAndCount(findOptions);

//     return paginate ? { data: products, total } : products;
//   }

//   async findOne(id: number): Promise<Product> {
//     const product = await this.productRepository.findOne({
//       where: { id },
//       relations: ['category'],
//       select: ['id', 'name', 'description', 'price', 'stock', 'status', 'imageUrls', 'categoryId'],
//     });
  
//     if (!product) {
//       throw new NotFoundException(`Product with ID ${id} not found`);
//     }
  
    
//     product.imageUrls = product.imageUrls
//     // ? product.imageUrls.map(filename => `${filename}`)
//     // : [];
//     return product;
//   }

//   async createProduct(createProductDto: CreateProductDto): Promise<Product> {
//     const { name, price, stock, categoryId, description, imageUrls, status = 'active' } = createProductDto;
  
//     // Validate inputs
//     const priceNum = parseFloat(Number(price).toFixed(2)); // Ensure price is a valid number with 2 decimal places
//     const stockNum = Number(stock);
//     const categoryIdNum = Number(categoryId);
  
//     if (!name || typeof name !== 'string' || name.trim() === '') {
//       throw new BadRequestException('Product name is required and must be a non-empty string.');
//     }
  
//     if (isNaN(priceNum) || priceNum <= 0) {
//       throw new BadRequestException('Price must be a positive number.');
//     }
  
//     if (isNaN(stockNum) || stockNum < 0) {
//       throw new BadRequestException('Stock must be a non-negative number.');
//     }
  
//     if (!categoryId || isNaN(categoryIdNum)) {
//       throw new BadRequestException('Category ID is required and must be a number.');
//     }
  
//     // Check if the category exists
//     const category = await this.categoryRepository.findOne({ where: { id: categoryIdNum } });
//     if (!category) {
//       throw new NotFoundException(`Category with ID ${categoryId} not found`);
//     }
  
//     // Check if a product with the same name and category already exists
//     const existingProduct = await this.productRepository.findOne({
//       where: { name: name.trim(), category },
//     });
  
//     if (existingProduct) {
//       throw new ConflictException(`Product with name "${name.trim()}" already exists in the "${category.name}" category`);
//     }
  
//     // Create and save the product
//     const product = this.productRepository.create({
//       name: name.trim(),
//       description,
//       price: priceNum,
//       stock: stockNum,
//       imageUrls: Array.isArray(imageUrls) ? imageUrls[0] : imageUrls,
//       status,
//       category,
//     });
  
//     return this.productRepository.save(product);
//   }

//   async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
//     const product = await this.findOne(id);
    
//     if (!updateProductDto || Object.keys(updateProductDto).length === 0) {
//       throw new BadRequestException('Fill at least one field to update');
//     }
  
//     if (updateProductDto.price !== undefined) {
//       updateProductDto.price = parseFloat(Number(updateProductDto.price).toFixed(2)); // Ensure price is decimal
//     }
  
//     if (updateProductDto.categoryId) {
//       const category = await this.categoryRepository.findOne({ where: { id: updateProductDto.categoryId } });
//       if (!category) {
//         throw new NotFoundException('Category not found');
//       }
//       product.category = category;
//     }
  
//     Object.assign(product, updateProductDto);
//     return this.productRepository.save(product);
//   }
  

//   async orderProduct(id: number, quantity: number): Promise<Product> {
//     const product = await this.findOne(id);
//     if (product.stock < quantity) {
//       throw new BadRequestException('Not enough stock available');
//     }
//     product.stock -= quantity;
//     return this.productRepository.save(product);
//   }

//   async filterByPrice(orderByPrice: 'asc' | 'desc'): Promise<Product[]> {
//     if (orderByPrice !== 'asc' && orderByPrice !== 'desc') {
//       throw new BadRequestException('Invalid order parameter. Use "asc" or "desc"');
//     }

//     return this.productRepository.find({ order: { price: orderByPrice.toUpperCase() as 'ASC' | 'DESC' }, relations: ['category'] });
//   }

//   async addStock(id: number, quantity: number): Promise<Product> {
//     const product = await this.findOne(id);
//     product.stock += quantity;
//     return this.productRepository.save(product);
//   }
// }


