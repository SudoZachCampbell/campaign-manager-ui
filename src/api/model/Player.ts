import { Building } from './Building';
import { Creature } from './Creature';
import { Locale } from './Locale';

export interface Player extends Creature {
  level: number;
  xp: number;
  inspiration: boolean;
  characterName: string;
  playerName: string;
  background: string;
  faction: string;
  race: string;
  localeId?: string | undefined;
  locale?: Locale | undefined;
  buildingId?: string | undefined;
  building?: Building | undefined;
}
