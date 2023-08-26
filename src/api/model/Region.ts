import { Locale } from './Locale';
import { Owned } from './Owned';
import { Continent } from './Continent';

export interface Region extends Owned {
  name: string;
  locales?: Locale[] | undefined;
  continentId?: string | undefined;
  continent?: Continent | undefined;
  map: string;
}
