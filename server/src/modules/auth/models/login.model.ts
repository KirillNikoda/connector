import { User } from 'src/modules/users/user.schema';

export interface LoginModel {
  user: User;
  access_token: string;
}
