import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './users.entity';
import { JwtAuthGuard } from 'src/jwt-quard/jwt-auth';
import { MyRequest } from 'src/types/my-request.interface';

@ApiTags('User')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Register
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.registerUser(registerUserDto);
  }

  // Login
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiUnauthorizedResponse({
    description: 'Email is wrong, or password is wrong or email not verified',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('login')
  async loginUser(@Body() loginUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.loginUser(loginUserDto);
  }

  // Logout

  @ApiOperation({ summary: 'User logout' })
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
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'User logged out' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('logout')
  async logoutUser(@Req() req: MyRequest): Promise<User> {
    const data = await this.usersService.logout(req.user.email);
    return data;
  }

  // Current user
  @ApiOperation({ summary: 'Current user' })
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
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Not authorized Invalid token type' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('current')
  public async currentUser(@Req() req: MyRequest) {
    const data = await this.usersService.currentUser(req.user.email);
    return data;
  }
}
