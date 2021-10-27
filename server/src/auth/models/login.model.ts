import { User } from 'src/users/user.schema';

export interface LoginModel {
  user: User;
  access_token: string;
}
