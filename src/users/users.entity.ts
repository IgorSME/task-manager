import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import {
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsIn } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @ApiProperty({
    example: '1',
    description: 'Unique id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'email', description: 'User email' })
  @Column({ name: 'email', type: 'varchar' })
  @Unique(['email'])
  @Matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'Invalid email format',
  })
  public email: string;

  @ApiProperty({ example: 'User password', description: 'User password' })
  @Column({ name: 'password', type: 'varchar', nullable: true })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Password must contain letters and numbers',
  })
  public password: string;

  @ApiProperty({ example: 'user', description: 'User role' })
  @Column({ name: 'role', type: 'varchar', default: 'user' })
  @IsIn([UserRole.ADMIN, UserRole.USER])
  public role: UserRole;

  @ApiProperty({ example: 'Access token', description: ' Access token' })
  @Column({ name: 'access_token', type: 'varchar', nullable: true })
  accessToken: string;

  @ApiProperty({ example: 'Refresh token', description: ' Refresh  token' })
  @Column({ name: 'refresh_token', type: 'varchar', nullable: true })
  refreshToken: string;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Created date',
  })
  @CreateDateColumn({ name: 'createdAt' })
  createAt: Date;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Update date',
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updateAt: Date;
}
