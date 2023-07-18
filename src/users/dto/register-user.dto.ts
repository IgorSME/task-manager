import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'email', description: ' User  email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'User password', description: ' User  password' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Password must contain letters and numbers',
  })
  password: string;
}
