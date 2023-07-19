import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuardModule } from 'src/jwt-quard/jwt-quard.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), JwtGuardModule],
  providers: [TasksService, ConfigService],
  controllers: [TasksController],
})
export class TasksModule {}
