import { Monster } from './monster';
import { Building } from './building';

export class MonsterBuilding {
  monsterId!: string;
  monster?: Monster | undefined;
  buildingId!: string;
  building?: Building | undefined;

  init(_data?: any) {
    if (_data) {
      this.monsterId = _data['monsterId'];
      this.monster = _data['monster']
        ? Monster.fromJS(_data['monster'])
        : <any>undefined;
      this.buildingId = _data['buildingId'];
      this.building = _data['building']
        ? Building.fromJS(_data['building'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): MonsterBuilding {
    data = typeof data === 'object' ? data : {};
    let result = new MonsterBuilding();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['monsterId'] = this.monsterId;
    data['monster'] = this.monster ? this.monster.toJSON() : <any>undefined;
    data['buildingId'] = this.buildingId;
    data['building'] = this.building ? this.building.toJSON() : <any>undefined;
    return data;
  }
}
