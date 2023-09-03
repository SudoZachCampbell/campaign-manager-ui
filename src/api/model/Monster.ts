import { Creature } from './Creature';
import { MonsterLocale } from './MonsterLocale';
import { MonsterBuilding } from './MonsterBuilding';
import { Npc } from './Npc';
import { CreatureAction } from './CreatureAction';
import { MonsterType } from './MonsterType';

export interface Monster extends Creature {
  challengeRating: number;
  xp: number;
  passivePerception: number;
  monsterType: MonsterType;
  actions?: CreatureAction[];
  legendaryActions?: CreatureAction[] | undefined;
  specialAbilities?: CreatureAction[] | undefined;
  senses?: Sense[] | undefined;
  npcs?: Npc[] | undefined;
  locales?: MonsterLocale[] | undefined;
  buildings?: MonsterBuilding[] | undefined;
}

export interface Sense {
  name: string;
  value: string;
}
