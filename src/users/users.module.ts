import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuardModule } from 'src/jwt-quard/jwt-quard.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtGuardModule],
  providers: [UsersService, ConfigService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
