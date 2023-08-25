import { Owned } from './owned';
import { Npc } from './npc';
import { Region } from './region';
import { Building } from './building';
import { Player } from './player';
import { Map } from './map';
import { Dungeon } from './dungeon';
import { MonsterLocale } from './monsterLocale';

export class Locale extends Owned {
  name!: string;
  regionId?: string | undefined;
  region?: Region | undefined;
  buildings?: Building[] | undefined;
  dungeons?: Dungeon[] | undefined;
  players?: Player[] | undefined;
  npcs?: Npc[] | undefined;
  monsters?: MonsterLocale[] | undefined;
  maps?: Map[] | undefined;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.name = _data['name'];
      this.regionId = _data['regionId'];
      this.region = _data['region']
        ? Region.fromJS(_data['region'])
        : <any>undefined;
      if (Array.isArray(_data['buildings'])) {
        this.buildings = [] as any;
        for (let item of _data['buildings'])
          this.buildings!.push(Building.fromJS(item));
      }
      if (Array.isArray(_data['dungeons'])) {
        this.dungeons = [] as any;
        for (let item of _data['dungeons'])
          this.dungeons!.push(Dungeon.fromJS(item));
      }
      if (Array.isArray(_data['players'])) {
        this.players = [] as any;
        for (let item of _data['players'])
          this.players!.push(Player.fromJS(item));
      }
      if (Array.isArray(_data['npcs'])) {
        this.npcs = [] as any;
        for (let item of _data['npcs']) this.npcs!.push(Npc.fromJS(item));
      }
      if (Array.isArray(_data['monsters'])) {
        this.monsters = [] as any;
        for (let item of _data['monsters'])
          this.monsters!.push(MonsterLocale.fromJS(item));
      }
      if (Array.isArray(_data['maps'])) {
        this.maps = [] as any;
        for (let item of _data['maps']) this.maps!.push(Map.fromJS(item));
      }
    }
  }

  static fromJS(data: any): Locale {
    data = typeof data === 'object' ? data : {};
    let result = new Locale();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['regionId'] = this.regionId;
    data['region'] = this.region ? this.region.toJSON() : <any>undefined;
    if (Array.isArray(this.buildings)) {
      data['buildings'] = [];
      for (let item of this.buildings) data['buildings'].push(item.toJSON());
    }
    if (Array.isArray(this.dungeons)) {
      data['dungeons'] = [];
      for (let item of this.dungeons) data['dungeons'].push(item.toJSON());
    }
    if (Array.isArray(this.players)) {
      data['players'] = [];
      for (let item of this.players) data['players'].push(item.toJSON());
    }
    if (Array.isArray(this.npcs)) {
      data['npcs'] = [];
      for (let item of this.npcs) data['npcs'].push(item.toJSON());
    }
    if (Array.isArray(this.monsters)) {
      data['monsters'] = [];
      for (let item of this.monsters) data['monsters'].push(item.toJSON());
    }
    if (Array.isArray(this.maps)) {
      data['maps'] = [];
      for (let item of this.maps) data['maps'].push(item.toJSON());
    }
    super.toJSON(data);
    return data;
  }
}
