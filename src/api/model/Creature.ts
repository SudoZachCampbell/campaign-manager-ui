import { Owned } from './Owned';
import { Alignment } from './Alignment';
import { Speed } from './Speed';
import { Size } from './Size';
import { Proficiencies } from './Proficiencies';
import { CreatureAction } from './CreatureAction';

export interface Creature extends Owned {
  name: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies?: Proficiencies[] | undefined;
  armorClass: number;
  hitPoints: number;
  hitDice: string;
  size: Size;
  speed?: Speed[] | undefined;
  languages: string;
  alignment: Alignment;
  reactions?: CreatureAction[] | undefined;
  picture: string;
}
