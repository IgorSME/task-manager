import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @ApiProperty({
    example: '1',
    description: 'Unique id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'name', description: 'Category name' })
  @Column({ name: 'name', type: 'varchar' })
  @Unique(['name'])
  name: string;

  @ApiProperty({ example: '1', description: 'User id' })
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ApiProperty({ type: () => User, description: 'User' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Created date',
  })
  @CreateDateColumn({ name: 'created_at' })
  createAt: Date;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Update date',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
