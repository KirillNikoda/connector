import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { User } from 'src/users/user.schema';
import { LoginUserDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register.dto';
import { LoginModel } from '../models/login.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../models/payload.model';
import * as gravatar from 'gravatar';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password } = registerUserDto;

    const userExists = await this.usersService.findByEmail(email);

    if (userExists) {
      throw new BadRequestException('User with that email already exists.');
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    const createdUser = await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
      avatar: avatar,
    });

    return createdUser;
  }

  public async login(loginUserDto: LoginUserDto): Promise<Partial<LoginModel>> {
    const user = await this.usersService.findByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('User with that email does not exist');
    }

    const isPasswordValid = await this.isPasswordValid(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const token = await this.jwtService.sign({ id: user.id });

    return {
      user: user,
      access_token: token,
    };
  }

  private async isPasswordValid(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  public async validateJwtToken(
    request: Request,
  ): Promise<boolean | Record<string, any> | string> {
    let token = request.headers.authorization;

    if (!token) {
      return false;
    }

    token = token.split(' ')[1];

    try {
      await this.jwtService.verify(token);
      return await this.jwtService.decode(token);
    } catch {
      return false;
    }
  }
}
