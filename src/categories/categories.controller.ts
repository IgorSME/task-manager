import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/jwt-quard/jwt-auth';
import { Category } from './categories.entity';
import { MyRequest } from 'src/types/my-request.interface';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Add category
  @ApiOperation({ summary: 'Create a new question' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token-type',
    description: 'Token type',
    required: true,
    schema: {
      type: 'string',
      format: 'token-type: access_token',
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiOkResponse({ description: 'OK' })
  @ApiConflictResponse({ description: 'This direction has already been added' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  // Update category
  @ApiOperation({ summary: 'Update category' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token-type',
    description: 'Token type',
    required: true,
    schema: {
      type: 'string',
      format: 'token-type: access_token',
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiOkResponse({ description: 'OK' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: Partial<CreateCategoryDto>,
  ): Promise<Category> {
    const updatedCategory = await this.categoriesService.updateCategory(
      id,
      updateCategoryDto,
    );

    return updatedCategory;
  }

  // Delete category
  @ApiOperation({ summary: 'Delete question' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token-type',
    description: 'Token type',
    required: true,
    schema: {
      type: 'string',
      format: 'token-type: access_token',
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }

  // Get all tasks
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token-type',
    description: 'Token type',
    required: true,
    schema: {
      type: 'string',
      format: 'token-type: access_token',
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'All tasks retrieved', type: [Category] })
  @Get()
  async getAllCategories(@Req() req: MyRequest): Promise<Category[]> {
    const userId = req.user.id;
    if (userId === undefined || userId === null) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
    return this.categoriesService.getAllCategories(userId);
  }
}
