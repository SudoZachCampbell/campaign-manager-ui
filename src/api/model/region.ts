import { Owned } from './owned';
import { Locale } from './locale';

import { Continent } from './continent';

export class Region extends Owned {
  name!: string;
  locales?: Locale[] | undefined;
  continentId?: string | undefined;
  continent?: Continent | undefined;
  map!: string;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.name = _data['name'];
      if (Array.isArray(_data['locales'])) {
        this.locales = [] as any;
        for (let item of _data['locales'])
          this.locales!.push(Locale.fromJS(item));
      }
      this.continentId = _data['continentId'];
      this.continent = _data['continent']
        ? Continent.fromJS(_data['continent'])
        : <any>undefined;
      this.map = _data['map'];
    }
  }

  static fromJS(data: any): Region {
    data = typeof data === 'object' ? data : {};
    let result = new Region();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    if (Array.isArray(this.locales)) {
      data['locales'] = [];
      for (let item of this.locales) data['locales'].push(item.toJSON());
    }
    data['continentId'] = this.continentId;
    data['continent'] = this.continent
      ? this.continent.toJSON()
      : <any>undefined;
    data['map'] = this.map;
    super.toJSON(data);
    return data;
  }
}
