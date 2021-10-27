import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileService } from '../service/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  public getMyProfile(@Req() request) {
    return this.profileService.getMyProfile(request.user._id);
  }

  @UseGuards(JwtGuard)
  @Post()
  public createProfile(@Body() createProfileDto: CreateProfileDto) {}
}
