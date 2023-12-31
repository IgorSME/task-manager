import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [JwtAuthGuard, ConfigService],
  exports: [JwtAuthGuard, JwtModule],
})
export class JwtGuardModule {}
