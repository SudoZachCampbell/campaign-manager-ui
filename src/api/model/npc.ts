import { Creature } from './creature';
import { Monster } from './monster';
import { Locale } from './locale';
import { Building } from './building';

export class Npc extends Creature {
  background!: string;
  noteableEvents?: any[] | undefined;
  beliefs?: any[] | undefined;
  passions?: any[] | undefined;
  flaws?: any[] | undefined;
  monsterId?: string | undefined;
  monster?: Monster | undefined;
  localeId?: string | undefined;
  locale?: Locale | undefined;
  buildingId?: string | undefined;
  building?: Building | undefined;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.background = _data['background'];
      if (Array.isArray(_data['noteableEvents'])) {
        this.noteableEvents = [] as any;
        for (let item of _data['noteableEvents'])
          this.noteableEvents!.push(item);
      }
      if (Array.isArray(_data['beliefs'])) {
        this.beliefs = [] as any;
        for (let item of _data['beliefs']) this.beliefs!.push(item);
      }
      if (Array.isArray(_data['passions'])) {
        this.passions = [] as any;
        for (let item of _data['passions']) this.passions!.push(item);
      }
      if (Array.isArray(_data['flaws'])) {
        this.flaws = [] as any;
        for (let item of _data['flaws']) this.flaws!.push(item);
      }
      this.monsterId = _data['monsterId'];
      this.monster = _data['monster']
        ? Monster.fromJS(_data['monster'])
        : <any>undefined;
      this.localeId = _data['localeId'];
      this.locale = _data['locale']
        ? Locale.fromJS(_data['locale'])
        : <any>undefined;
      this.buildingId = _data['buildingId'];
      this.building = _data['building']
        ? Building.fromJS(_data['building'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): Npc {
    data = typeof data === 'object' ? data : {};
    let result = new Npc();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['background'] = this.background;
    if (Array.isArray(this.noteableEvents)) {
      data['noteableEvents'] = [];
      for (let item of this.noteableEvents) data['noteableEvents'].push(item);
    }
    if (Array.isArray(this.beliefs)) {
      data['beliefs'] = [];
      for (let item of this.beliefs) data['beliefs'].push(item);
    }
    if (Array.isArray(this.passions)) {
      data['passions'] = [];
      for (let item of this.passions) data['passions'].push(item);
    }
    if (Array.isArray(this.flaws)) {
      data['flaws'] = [];
      for (let item of this.flaws) data['flaws'].push(item);
    }
    data['monsterId'] = this.monsterId;
    data['monster'] = this.monster ? this.monster.toJSON() : <any>undefined;
    data['localeId'] = this.localeId;
    data['locale'] = this.locale ? this.locale.toJSON() : <any>undefined;
    data['buildingId'] = this.buildingId;
    data['building'] = this.building ? this.building.toJSON() : <any>undefined;
    super.toJSON(data);
    return data;
  }
}
