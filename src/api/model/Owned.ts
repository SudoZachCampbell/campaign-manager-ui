import { Account } from './Account';
import { Base } from './Base';

export interface Owned extends Base {
  ownerId: string;
  owner?: Account | undefined;
}
