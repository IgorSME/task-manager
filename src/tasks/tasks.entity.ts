import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/categories.entity';
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

@Entity('tasks')
export class Task {
  @ApiProperty({
    example: '1',
    description: 'Unique id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'task', description: 'Task name' })
  @Column({ name: 'name', type: 'varchar' })
  @Unique(['name'])
  public name: string;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Start date',
  })
  startDate: Date;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'End date',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  endDate: Date;

  //   @ApiProperty({ example: '1', description: 'User id' })
  //   @Column({ name: 'user_id', type: 'int' })
  //   userId: number;

  //   @ApiProperty({ type: () => User, description: 'User' })
  //   @ManyToOne(() => User)
  //   @JoinColumn({ name: 'user_id' })
  //   user: User;

  @ApiProperty({ example: '1', description: 'Task id' })
  @Column({ name: 'task_id', type: 'int' })
  taskId: number;

  @ApiProperty({ type: () => Category, description: 'Category' })
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'id' })
  category: Category;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Created date',
  })
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Update date',
  })
  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
