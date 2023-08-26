import { Base } from './Base';
import { Monster } from './Monster';

export interface Account extends Base {
  username: string;
  email: string;
  password?: string | undefined;
  role?: string | undefined;
  monsters?: Monster[] | undefined;
}
