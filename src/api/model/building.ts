import { Owned } from './owned';
import { Locale } from './locale';
import { Npc } from './npc';
import { MonsterBuilding } from './monsterBuilding';
import { Player } from './player';
import { BuildingMap } from './buildingMap';

export class Building extends Owned {
  name!: string;
  localeId?: string | undefined;
  locale?: Locale | undefined;
  map!: string;
  npcs?: Npc[] | undefined;
  monsters?: MonsterBuilding[] | undefined;
  players?: Player[] | undefined;
  maps?: BuildingMap[] | undefined;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.name = _data['name'];
      this.localeId = _data['localeId'];
      this.locale = _data['locale']
        ? Locale.fromJS(_data['locale'])
        : <any>undefined;
      this.map = _data['map'];
      if (Array.isArray(_data['npcs'])) {
        this.npcs = [] as any;
        for (let item of _data['npcs']) this.npcs!.push(Npc.fromJS(item));
      }
      if (Array.isArray(_data['monsters'])) {
        this.monsters = [] as any;
        for (let item of _data['monsters'])
          this.monsters!.push(MonsterBuilding.fromJS(item));
      }
      if (Array.isArray(_data['players'])) {
        this.players = [] as any;
        for (let item of _data['players'])
          this.players!.push(Player.fromJS(item));
      }
      if (Array.isArray(_data['maps'])) {
        this.maps = [] as any;
        for (let item of _data['maps'])
          this.maps!.push(BuildingMap.fromJS(item));
      }
    }
  }

  static fromJS(data: any): Building {
    data = typeof data === 'object' ? data : {};
    let result = new Building();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['localeId'] = this.localeId;
    data['locale'] = this.locale ? this.locale.toJSON() : <any>undefined;
    data['map'] = this.map;
    if (Array.isArray(this.npcs)) {
      data['npcs'] = [];
      for (let item of this.npcs) data['npcs'].push(item.toJSON());
    }
    if (Array.isArray(this.monsters)) {
      data['monsters'] = [];
      for (let item of this.monsters) data['monsters'].push(item.toJSON());
    }
    if (Array.isArray(this.players)) {
      data['players'] = [];
      for (let item of this.players) data['players'].push(item.toJSON());
    }
    if (Array.isArray(this.maps)) {
      data['maps'] = [];
      for (let item of this.maps) data['maps'].push(item.toJSON());
    }
    super.toJSON(data);
    return data;
  }
}
