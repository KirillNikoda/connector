import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { profile } from 'console';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from '../profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  public async getMyProfile(id: string) {
    const profile = await this.profileModel
      .findOne({ id })
      .populate('user', ['name', 'avatar']);

    return profile;
  }
}
