import { Building } from './Building';
import { Locale } from './Locale';
import { Owned } from './Owned';

export interface Dungeon extends Owned {
  name: string;
  type: string;
  map?: string | undefined;
  building?: Building | undefined;
  locale?: Locale | undefined;
}
