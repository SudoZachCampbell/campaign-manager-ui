import { Npc } from './Npc';
import { Owned } from './Owned';
import { MonsterLocale } from './MonsterLocale';
import { Dungeon } from './Dungeon';
import { Map } from './Map';
import { Player } from './Player';
import { Building } from './Building';
import { Region } from './Region';

export interface Locale extends Owned {
  name: string;
  regionId?: string | undefined;
  region?: Region | undefined;
  buildings?: Building[] | undefined;
  dungeons?: Dungeon[] | undefined;
  players?: Player[] | undefined;
  npcs?: Npc[] | undefined;
  monsters?: MonsterLocale[] | undefined;
  maps?: Map[] | undefined;
}
