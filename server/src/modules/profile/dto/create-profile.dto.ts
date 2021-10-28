import { IsNotEmpty } from 'class-validator';
import { Experience } from '../models/experience.model';
import { Social } from '../models/social.model';

export class CreateProfileDto {
  company: string;
  website: string;
  location: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  skills: string[];

  bio: string;

  githubusername: string;

  date?: Date;

  experience: Experience[];

  social: Social;
}
