import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Add category
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    const createdCategory = await this.categoryRepository.save(category);

    return createdCategory;
  }

  // Update category
  async updateCategory(
    id: number,
    updateCategoryDto: Partial<CreateCategoryDto>,
  ) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    Object.assign(category, updateCategoryDto);

    await this.categoryRepository.save(category);
    return category;
  }

  //Delete category
  async deleteCategory(id: number): Promise<DeleteResult> {
    const deletedCategory = await this.categoryRepository.delete(id);

    if (deletedCategory.affected === 0) {
      throw new NotFoundException('Category not found');
    }
    return deletedCategory;
  }

  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
