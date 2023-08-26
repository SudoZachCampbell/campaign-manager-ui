import { Building } from './Building';
import { Map } from './Map';

export interface BuildingMap {
  buildingId: string;
  building?: Building | undefined;
  mapId: string;
  map?: Map | undefined;
  coords?: number[] | undefined;
}
