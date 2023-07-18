import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuardModule } from 'src/jwt-quard/jwt-quard.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), JwtGuardModule],
  providers: [CategoriesService, ConfigService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
