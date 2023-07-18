import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from './users.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Register
  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password } = registerUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException('User is already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      ...registerUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  // Login
  async loginUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password } = registerUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email or password wrong!');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new UnauthorizedException('Email or password wrong!');
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    await this.userRepository.save(user);

    return user;
    return user;
  }

  // Logout
  async logout(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    user.accessToken = null;
    user.refreshToken = null;

    await this.userRepository.save(user);

    return user;
  }

  // Generate tokens
  private async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { email: user.email, id: user.id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.ACCESS_TOKEN_PRIVATE_KEY || 'SUCCESS_TOKEN',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.REFRESH_TOKEN_PRIVATE_KEY || 'REFRESH_TOKEN',
    });

    await this.userRepository.update(user.id, {
      refreshToken,
      accessToken,
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  // Current user
  async currentUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
