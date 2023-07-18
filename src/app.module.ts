import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from './db/typeorm.config';
import { JwtGuardModule } from './jwt-quard/jwt-quard.module';

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    TasksModule,
    ConfigModule,
    TypeOrmModule,
    JwtGuardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
