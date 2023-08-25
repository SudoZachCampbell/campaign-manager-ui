import { Owned } from './owned';
import { Building } from './building';
import { Locale } from './locale';

export class Dungeon extends Owned {
  name!: string;
  type!: string;
  map?: string | undefined;
  building?: Building | undefined;
  locale?: Locale | undefined;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.name = _data['name'];
      this.type = _data['type'];
      this.map = _data['map'];
      this.building = _data['building']
        ? Building.fromJS(_data['building'])
        : <any>undefined;
      this.locale = _data['locale']
        ? Locale.fromJS(_data['locale'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): Dungeon {
    data = typeof data === 'object' ? data : {};
    let result = new Dungeon();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['type'] = this.type;
    data['map'] = this.map;
    data['building'] = this.building ? this.building.toJSON() : <any>undefined;
    data['locale'] = this.locale ? this.locale.toJSON() : <any>undefined;
    super.toJSON(data);
    return data;
  }
}
