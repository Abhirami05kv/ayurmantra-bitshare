
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { deleteCategoryDto } from './dto/delete-category.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CategoriesService {
  logger: Logger = new Logger('CategoriesService');
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
   


  // async create(createCategoryDto: CreateCategoryDto): Promise<{ statusCode: number; message: string; data: Category }> {
  //   if (!createCategoryDto.name || !createCategoryDto.description) {
  //     throw new BadRequestException({ statusCode: 400, message: 'Fill the field' });
  //   }

   

  
  //   const existingCategory = await this.categoryRepository.findOne({
  //     where: { name: createCategoryDto.name },
  //   });
  
  //   if (existingCategory) {
  //     throw new ConflictException({ statusCode: 409, message: 'Category with this name already exists' });
  //   }
  
  //   const category = this.categoryRepository.create(createCategoryDto);
  //   const savedCategory = await this.categoryRepository.save(category);
  
  //   return {
  //     statusCode: 201,
  //     message: 'Category created successfully',
  //     data: savedCategory,
  //   };
  // }

  async create(createCategoryDto: CreateCategoryDto): Promise<{ statusCode: number; message: string; data: Category }> {
    if (!createCategoryDto.name || !createCategoryDto.description) {
        throw new BadRequestException({ statusCode: 400, message: 'Fill the field' });
    }

    const existingCategory = await this.categoryRepository.findOne({
        where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
        throw new ConflictException({ statusCode: 409, message: 'Category with this name already exists' });
    }

    const category = this.categoryRepository.create(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);

    // Fetch categories sorted by newest first
    const categories = await this.categoryRepository.find({
        order: { createdAt: 'DESC' },
    });

    return {
        statusCode: 201,
        message: 'Category created successfully',
        data: savedCategory,
    };
}

  

  async findAll(
    page: number = 1,
    limit: number = 10,
    paginate: boolean | string = 'true',
  ): Promise<{ statusCode: number; message: string; data: Category[]; total: number; totalPages?: number }> {
    this.logger.debug('11111111111');
    // Convert paginate to boolean if it's a string
    paginate = paginate === 'true' || paginate === true;

    // Validate page and limit
    page = Math.max(1, Number(page));
    limit = Math.max(1, Number(limit));

    const findOptions: any = {
      relations: ['products'],
      order: {
        name: 'DESC',
      },
    };

    if (paginate) {
      findOptions.skip = (page - 1) * limit;
      findOptions.take = limit;
    }

    const [categories, total] =
      await this.categoryRepository.findAndCount(findOptions);

    const result = categories.map((category) => ({
      ...category,
      categoryCount: category.products?.length || 0,
    }));

    const response = {
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: result,
      total,
    };

    if (paginate) {
      response['totalPages'] = Math.ceil(total / limit);
    }
  
    return response;
  }

  async findOne(id: number): Promise<{ statusCode: number; message: string; data?: Category }> {
    const category = await this.categoryRepository
      .createQueryBuilder('Category')
      .leftJoinAndSelect('Category.products', 'product')
      .addSelect('product.stock')
      .where('Category.id = :id', { id })
      .getOne();
  
    if (!category) {
      throw new NotFoundException({ statusCode: 404, message: 'Category not found' });
    }
  
    return {
      statusCode: 200,
      message: 'Category retrieved successfully',
      data: category,
    };
  }
  

   async update(
        id: number,
        updateCategoryDto: UpdateCategoryDto,
      ): Promise<{ statusCode: number; message: string; data?: Category }> {
        const category = await this.categoryRepository.findOne({ where: { id } });
    
        if (!category) {
          throw new NotFoundException({ statusCode: 404, message: 'Category not found' });
        }
    
        if (!updateCategoryDto.name || !updateCategoryDto.description) {
          throw new BadRequestException({ statusCode: 400, message: 'Fill the field' });
        }
    
        // if (updateCategoryDto.isactive !== undefined) {
        //   category.isactive = updateCategoryDto.isactive;
        // }
    
        if (updateCategoryDto.status) {
          category.status = updateCategoryDto.status;
        }
    
        Object.assign(category, updateCategoryDto);
        await this.categoryRepository.save(category);
    
        
        const updatedCategory = await this.categoryRepository.findOne({ where: { id } });
        if (!updatedCategory) {
          throw new NotFoundException({ statusCode: 404, message: 'Updated category not found' });
        }
        return {
          statusCode: 200,
          message: 'Category updated successfully',
          data: updatedCategory,
        };
    }
    
  

    async delete(
      id: number,
      deleteCategoryDto: deleteCategoryDto,
    ): Promise<{ statusCode: number; message: string }> {
      const category = await this.categoryRepository.findOne({ where: { id } });
    
      if (!category) {
        throw new NotFoundException({ statusCode: 404, message: 'Category not found' });
      }
    
      await this.categoryRepository.delete(id);
    
      return {
        statusCode: 200,
        message: 'Category deleted successfully',
      };
    }
    
}

