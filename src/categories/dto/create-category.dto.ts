import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'name', description: 'Category name' })
  name: string;

  @ApiProperty({ example: '1', description: 'User id' })
  userId: number;
}
