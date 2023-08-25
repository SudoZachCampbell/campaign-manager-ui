import { Owned } from './owned';
import { Region } from './region';

export class Continent extends Owned {
  name!: string;
  regions?: Region[] | undefined;
  map?: string | undefined;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.name = _data['name'];
      if (Array.isArray(_data['regions'])) {
        this.regions = [] as any;
        for (let item of _data['regions'])
          this.regions!.push(Region.fromJS(item));
      }
      this.map = _data['map'];
    }
  }

  static fromJS(data: any): Continent {
    data = typeof data === 'object' ? data : {};
    let result = new Continent();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    if (Array.isArray(this.regions)) {
      data['regions'] = [];
      for (let item of this.regions) data['regions'].push(item.toJSON());
    }
    data['map'] = this.map;
    super.toJSON(data);
    return data;
  }
}
