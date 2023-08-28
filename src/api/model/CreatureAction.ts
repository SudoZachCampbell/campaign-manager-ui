import { DC } from './DC';
import { Usage } from './Usage';
import { Damage } from './Damage';

export interface CreatureAction {
  name: string;
  type: string;
  desc: string;
  count?: number | undefined;
  attackBonus?: number | undefined;
  damage: Damage[];
  usage?: Usage | undefined;
  actions?: CreatureAction[] | undefined;
  dc?: DC | undefined;
}
