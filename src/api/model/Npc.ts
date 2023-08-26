import { Creature } from './Creature';
import { Monster } from './Monster';
import { Building } from './Building';
import { Locale } from './Locale';

export interface Npc extends Creature {
  background: string;
  noteableEvents?: any[] | undefined;
  beliefs?: any[] | undefined;
  passions?: any[] | undefined;
  flaws?: any[] | undefined;
  monsterId?: string | undefined;
  monster?: Monster | undefined;
  localeId?: string | undefined;
  locale?: Locale | undefined;
  buildingId?: string | undefined;
  building?: Building | undefined;
}
