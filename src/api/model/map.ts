import { Owned } from './owned';
import { Locale } from './locale';
import { BuildingMap } from './buildingMap';

export class Map extends Owned {
  name!: string;
  variation!: string;
  imageUrl!: string;
  center?: any[] | undefined;
  localeId!: string;
  locale?: Locale | undefined;
  buildings?: BuildingMap[] | undefined;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.name = _data['name'];
      this.variation = _data['variation'];
      this.imageUrl = _data['imageUrl'];
      if (Array.isArray(_data['center'])) {
        this.center = [] as any;
        for (let item of _data['center']) this.center!.push(item);
      }
      this.localeId = _data['localeId'];
      this.locale = _data['locale']
        ? Locale.fromJS(_data['locale'])
        : <any>undefined;
      if (Array.isArray(_data['buildings'])) {
        this.buildings = [] as any;
        for (let item of _data['buildings'])
          this.buildings!.push(BuildingMap.fromJS(item));
      }
    }
  }

  static fromJS(data: any): Map {
    data = typeof data === 'object' ? data : {};
    let result = new Map();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['variation'] = this.variation;
    data['imageUrl'] = this.imageUrl;
    if (Array.isArray(this.center)) {
      data['center'] = [];
      for (let item of this.center) data['center'].push(item);
    }
    data['localeId'] = this.localeId;
    data['locale'] = this.locale ? this.locale.toJSON() : <any>undefined;
    if (Array.isArray(this.buildings)) {
      data['buildings'] = [];
      for (let item of this.buildings) data['buildings'].push(item.toJSON());
    }
    super.toJSON(data);
    return data;
  }
}
