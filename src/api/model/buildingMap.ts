import { Building } from './building';

import { Map } from './map';

export class BuildingMap {
  buildingId!: string;
  building?: Building | undefined;
  mapId!: string;
  map?: Map | undefined;
  coords?: number[] | undefined;

  init(_data?: any) {
    if (_data) {
      this.buildingId = _data['buildingId'];
      this.building = _data['building']
        ? Building.fromJS(_data['building'])
        : <any>undefined;
      this.mapId = _data['mapId'];
      this.map = _data['map'] ? Map.fromJS(_data['map']) : <any>undefined;
      if (Array.isArray(_data['coords'])) {
        this.coords = [] as any;
        for (let item of _data['coords']) this.coords!.push(item);
      }
    }
  }

  static fromJS(data: any): BuildingMap {
    data = typeof data === 'object' ? data : {};
    let result = new BuildingMap();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['buildingId'] = this.buildingId;
    data['building'] = this.building ? this.building.toJSON() : <any>undefined;
    data['mapId'] = this.mapId;
    data['map'] = this.map ? this.map.toJSON() : <any>undefined;
    if (Array.isArray(this.coords)) {
      data['coords'] = [];
      for (let item of this.coords) data['coords'].push(item);
    }
    return data;
  }
}
