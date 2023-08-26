import { Locale } from './Locale';
import { Monster } from './Monster';

export interface MonsterLocale {
  monsterId: string;
  monster?: Monster | undefined;
  localeId: string;
  locale?: Locale | undefined;
}
