import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/jwt-quard/jwt-auth';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';

@ApiTags('Tasks')
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  // Add task
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
  async createCategory(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  // Update task
  @ApiOperation({ summary: 'Update task' })
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
    @Body() updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    const updatedTask = await this.taskService.updateTask(id, updateTaskDto);

    return updatedTask;
  }

  // Delete task
  @ApiOperation({ summary: 'Delete task' })
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
  async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
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
  @ApiOkResponse({ description: 'All tasks retrieved', type: [Task] })
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }
}
