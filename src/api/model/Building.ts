import { Locale } from './Locale';
import { Npc } from './Npc';
import { Owned } from './Owned';
import { BuildingMap } from './BuildingMap';
import { Player } from './Player';
import { MonsterBuilding } from './MonsterBuilding';

export interface Building extends Owned {
  name: string;
  localeId?: string | undefined;
  locale?: Locale | undefined;
  map: string;
  npcs?: Npc[] | undefined;
  monsters?: MonsterBuilding[] | undefined;
  players?: Player[] | undefined;
  maps?: BuildingMap[] | undefined;
}
