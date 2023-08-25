import { Creature } from './creature';
import { Locale } from './locale';
import { Building } from './building';

export class Player extends Creature {
  level!: number;
  xp!: number;
  inspiration!: boolean;
  characterName!: string;
  playerName!: string;
  background!: string;
  faction!: string;
  race!: string;
  localeId?: string | undefined;
  locale?: Locale | undefined;
  buildingId?: string | undefined;
  building?: Building | undefined;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.level = _data['level'];
      this.xp = _data['xp'];
      this.inspiration = _data['inspiration'];
      this.characterName = _data['characterName'];
      this.playerName = _data['playerName'];
      this.background = _data['background'];
      this.faction = _data['faction'];
      this.race = _data['race'];
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

  static fromJS(data: any): Player {
    data = typeof data === 'object' ? data : {};
    let result = new Player();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['level'] = this.level;
    data['xp'] = this.xp;
    data['inspiration'] = this.inspiration;
    data['characterName'] = this.characterName;
    data['playerName'] = this.playerName;
    data['background'] = this.background;
    data['faction'] = this.faction;
    data['race'] = this.race;
    data['localeId'] = this.localeId;
    data['locale'] = this.locale ? this.locale.toJSON() : <any>undefined;
    data['buildingId'] = this.buildingId;
    data['building'] = this.building ? this.building.toJSON() : <any>undefined;
    super.toJSON(data);
    return data;
  }
}
