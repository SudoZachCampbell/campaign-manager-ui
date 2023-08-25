import { Damage } from './damage';
import { Usage } from './usage';
import { DC } from './DC';

export class CreatureAction {
  name!: string;
  type!: string;
  desc!: string;
  count?: number | undefined;
  attackBonus?: number | undefined;
  damage?: Damage[] | undefined;
  usage?: Usage | undefined;
  actions?: CreatureAction[] | undefined;
  dc?: DC | undefined;

  init(_data?: any) {
    if (_data) {
      this.name = _data['name'];
      this.type = _data['type'];
      this.desc = _data['desc'];
      this.count = _data['count'];
      this.attackBonus = _data['attackBonus'];
      if (Array.isArray(_data['damage'])) {
        this.damage = [] as any;
        for (let item of _data['damage'])
          this.damage!.push(Damage.fromJS(item));
      }
      this.usage = _data['usage']
        ? Usage.fromJS(_data['usage'])
        : <any>undefined;
      if (Array.isArray(_data['actions'])) {
        this.actions = [] as any;
        for (let item of _data['actions'])
          this.actions!.push(CreatureAction.fromJS(item));
      }
      this.dc = _data['dc'] ? DC.fromJS(_data['dc']) : <any>undefined;
    }
  }

  static fromJS(data: any): CreatureAction {
    data = typeof data === 'object' ? data : {};
    let result = new CreatureAction();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['type'] = this.type;
    data['desc'] = this.desc;
    data['count'] = this.count;
    data['attackBonus'] = this.attackBonus;
    if (Array.isArray(this.damage)) {
      data['damage'] = [];
      for (let item of this.damage) data['damage'].push(item.toJSON());
    }
    data['usage'] = this.usage ? this.usage.toJSON() : <any>undefined;
    if (Array.isArray(this.actions)) {
      data['actions'] = [];
      for (let item of this.actions) data['actions'].push(item.toJSON());
    }
    data['dc'] = this.dc ? this.dc.toJSON() : <any>undefined;
    return data;
  }
}
