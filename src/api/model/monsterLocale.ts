import { Monster } from './monster';
import { Locale } from './locale';

export class MonsterLocale {
  monsterId!: string;
  monster?: Monster | undefined;
  localeId!: string;
  locale?: Locale | undefined;

  init(_data?: any) {
    if (_data) {
      this.monsterId = _data['monsterId'];
      this.monster = _data['monster']
        ? Monster.fromJS(_data['monster'])
        : <any>undefined;
      this.localeId = _data['localeId'];
      this.locale = _data['locale']
        ? Locale.fromJS(_data['locale'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): MonsterLocale {
    data = typeof data === 'object' ? data : {};
    let result = new MonsterLocale();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['monsterId'] = this.monsterId;
    data['monster'] = this.monster ? this.monster.toJSON() : <any>undefined;
    data['localeId'] = this.localeId;
    data['locale'] = this.locale ? this.locale.toJSON() : <any>undefined;
    return data;
  }
}
