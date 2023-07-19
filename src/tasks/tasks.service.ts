import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  // Add task
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    const createdTask = await this.taskRepository.save(task);

    return createdTask;
  }

  // Update task
  async updateTask(id: number, updateTaskDto: Partial<CreateTaskDto>) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    Object.assign(task, updateTaskDto);
    this.taskRepository.save(task);

    return task;
  }

  //Delete task
  async deleteTask(id: number): Promise<DeleteResult> {
    const deletedTask = await this.taskRepository.delete(id);

    if (deletedTask.affected === 0) {
      throw new NotFoundException('Category not found');
    }
    return deletedTask;
  }

  // Get all tasks by category
  async getAllTasksByCategory(taskId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { taskId } });
  }
}
