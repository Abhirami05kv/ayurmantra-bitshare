import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { deleteCategoryDto } from './dto/delete-category.dto';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Create Category
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // Fetch all categories with or without pagination
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('paginate') paginate: boolean | string = 'true',
  ) {
    return this.categoriesService.findAll(page, limit, paginate);
  }

  // Get Category by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(+id);
  }

  // Update Category
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  // Delete Category
  @Delete(':id')
  async delete(@Param('id') id: string, @Body() deleteCategoryDto: deleteCategoryDto) {
    return await this.categoriesService.delete(+id, deleteCategoryDto);
  }
}


