import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/service/users.service';
import { UserDocument } from 'src/modules/users/user.schema';
import { JwtPayload } from '../models/payload.model';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const payload = (await this.authService.validateJwtToken(
      request,
    )) as JwtPayload;

    if (!payload) {
      return false;
    }

    const user = await this.usersService.findOne(payload.id);

    request.user = user;

    return true;
  }
}
