import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'task', description: 'Task name' })
  name: string;

  @ApiProperty({ example: 'Description', description: 'Task descroption' })
  description: string;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Start date',
  })
  startDate: Date;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'End date',
  })
  endDate: Date;

  @ApiProperty({ example: '1', description: 'Task id' })
  taskId: number;
}
