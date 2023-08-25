import { Creature } from './creature';
import { MonsterType } from './monsterType';
import { CreatureAction } from './creatureAction';
import { Npc } from './npc';
import { MonsterBuilding } from './monsterBuilding';
import { MonsterLocale } from './monsterLocale';

export class Monster extends Creature {
  challengeRating!: number;
  xp!: number;
  passivePerception!: number;
  monsterType!: MonsterType;
  actions?: CreatureAction[] | undefined;
  legendaryActions?: CreatureAction[] | undefined;
  specialAbilities?: CreatureAction[] | undefined;
  senses?: { [key: string]: string } | undefined;
  npcs?: Npc[] | undefined;
  locales?: MonsterLocale[] | undefined;
  buildings?: MonsterBuilding[] | undefined;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.challengeRating = _data['challengeRating'];
      this.xp = _data['xp'];
      this.passivePerception = _data['passivePerception'];
      this.monsterType = _data['monsterType'];
      if (Array.isArray(_data['actions'])) {
        this.actions = [] as any;
        for (let item of _data['actions'])
          this.actions!.push(CreatureAction.fromJS(item));
      }
      if (Array.isArray(_data['legendaryActions'])) {
        this.legendaryActions = [] as any;
        for (let item of _data['legendaryActions'])
          this.legendaryActions!.push(CreatureAction.fromJS(item));
      }
      if (Array.isArray(_data['specialAbilities'])) {
        this.specialAbilities = [] as any;
        for (let item of _data['specialAbilities'])
          this.specialAbilities!.push(CreatureAction.fromJS(item));
      }
      if (_data['senses']) {
        this.senses = {} as any;
        for (let key in _data['senses']) {
          if (_data['senses'].hasOwnProperty(key))
            (<any>this.senses)![key] = _data['senses'][key];
        }
      }
      if (Array.isArray(_data['npcs'])) {
        this.npcs = [] as any;
        for (let item of _data['npcs']) this.npcs!.push(Npc.fromJS(item));
      }
      if (Array.isArray(_data['locales'])) {
        this.locales = [] as any;
        for (let item of _data['locales'])
          this.locales!.push(MonsterLocale.fromJS(item));
      }
      if (Array.isArray(_data['buildings'])) {
        this.buildings = [] as any;
        for (let item of _data['buildings'])
          this.buildings!.push(MonsterBuilding.fromJS(item));
      }
    }
  }

  static fromJS(data: any): Monster {
    data = typeof data === 'object' ? data : {};
    let result = new Monster();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['challengeRating'] = this.challengeRating;
    data['xp'] = this.xp;
    data['passivePerception'] = this.passivePerception;
    data['monsterType'] = this.monsterType;
    if (Array.isArray(this.actions)) {
      data['actions'] = [];
      for (let item of this.actions) data['actions'].push(item.toJSON());
    }
    if (Array.isArray(this.legendaryActions)) {
      data['legendaryActions'] = [];
      for (let item of this.legendaryActions)
        data['legendaryActions'].push(item.toJSON());
    }
    if (Array.isArray(this.specialAbilities)) {
      data['specialAbilities'] = [];
      for (let item of this.specialAbilities)
        data['specialAbilities'].push(item.toJSON());
    }
    if (this.senses) {
      data['senses'] = {};
      for (let key in this.senses) {
        if (this.senses.hasOwnProperty(key))
          (<any>data['senses'])[key] = (<any>this.senses)[key];
      }
    }
    if (Array.isArray(this.npcs)) {
      data['npcs'] = [];
      for (let item of this.npcs) data['npcs'].push(item.toJSON());
    }
    if (Array.isArray(this.locales)) {
      data['locales'] = [];
      for (let item of this.locales) data['locales'].push(item.toJSON());
    }
    if (Array.isArray(this.buildings)) {
      data['buildings'] = [];
      for (let item of this.buildings) data['buildings'].push(item.toJSON());
    }
    super.toJSON(data);
    return data;
  }
}
