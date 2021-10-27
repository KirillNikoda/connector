import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { LoginUserDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  public register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @Post('sign-in')
  public login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<Partial<LoginModel>> {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('test')
  test(@Req() req: any) {
    console.log(req.user);

    return true;
  }
}
