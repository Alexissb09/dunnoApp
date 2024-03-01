import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './entities/auth.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private handleError(error): never {
    if (error.code === '23505') {
      throw new BadRequestException('User already exist in database');
    }

    throw new BadRequestException(error.detail);
  }

  async create(authUserDto: AuthUserDto) {
    const { username, password } = authUserDto;

    const user = this.authRepository.create({
      username,
      password: bcrypt.hashSync(password, 10),
    });

    try {
      await this.authRepository.save(user);

      // JWT
      const token = await this.getToken({
        id: user.id,
      });

      return {
        msg: 'User created',
        token,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async login(authUserDto: AuthUserDto) {
    const { username, password } = authUserDto;

    // Busco el user en base de datos
    const user = await this.authRepository.findOneBy({ username });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Pregunto si las passwords coinciden
    const match = bcrypt.compareSync(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    // JWT
    const token = await this.getToken({
      id: user.id,
    });

    return {
      msg: 'User logged',
      token,
    };
  }

  private async getToken(payload: JwtPayload) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  //   findAll() {
  //     return `This action returns all auth`;
  //   }

  //   findOne(id: number) {
  //     return `This action returns a #${id} auth`;
  //   }

  //   update(id: number, updateAuthDto: UpdateAuthDto) {
  //     return `This action updates a #${id} auth`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} auth`;
  //   }
}
