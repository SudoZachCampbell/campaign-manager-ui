import { Building } from './Building';
import { Monster } from './Monster';

export interface MonsterBuilding {
  monsterId: string;
  monster?: Monster | undefined;
  buildingId: string;
  building?: Building | undefined;
}
