import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from 'src/users/user.schema';
import { Experience } from './models/experience.model';
import { Social } from './models/social.model';

export type ProfileDocument = Profile & mongoose.Document;
@Schema()
export class Profile {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  company: string;

  @Prop()
  website: string;

  @Prop()
  location: string;

  @Prop()
  status: string;

  @Prop({ type: [String], required: true })
  skills: string[];

  @Prop()
  bio: string;

  @Prop()
  githubusername: string;

  @Prop({ type: Date, default: Date.now })
  date?: Date;

  @Prop({
    type: [
      {
        title: String,
        company: String,
        location: String,
        from: Date,
        to: Date,
        current: Boolean,
        description: String,
      },
    ],
  })
  experience: Experience[];

  @Prop({
    type: {
      youtube: String,
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String,
    },
  })
  social: Social;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
