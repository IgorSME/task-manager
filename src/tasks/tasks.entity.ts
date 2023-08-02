import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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
  name: string;

  @ApiProperty({ example: 'Description', description: 'Task descroption' })
  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Start date',
  })
  @Column({
    name: 'start_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: Date;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'End date',
  })
  @Column({
    name: 'end_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  endDate: Date;

  @ApiProperty({ example: '1', description: 'Task id' })
  @Column({ name: 'task_id', type: 'int' })
  taskId: number;

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
