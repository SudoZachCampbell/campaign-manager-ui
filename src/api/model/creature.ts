import { Owned } from './owned';
import { CreatureAction } from './creatureAction';
import { Proficiencies } from './proficiencies';
import { Size } from './size';
import { Speed } from './speed';
import { Alignment } from './alignment';

export class Creature extends Owned {
  name!: string;
  strength!: number;
  dexterity!: number;
  constitution!: number;
  intelligence!: number;
  wisdom!: number;
  charisma!: number;
  proficiencies?: Proficiencies[] | undefined;
  armorClass!: number;
  hitPoints!: number;
  hitDice!: string;
  size!: Size;
  speed?: Speed[] | undefined;
  languages!: string;
  alignment!: Alignment;
  reactions?: CreatureAction[] | undefined;
  picture!: string;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.name = _data['name'];
      this.strength = _data['strength'];
      this.dexterity = _data['dexterity'];
      this.constitution = _data['constitution'];
      this.intelligence = _data['intelligence'];
      this.wisdom = _data['wisdom'];
      this.charisma = _data['charisma'];
      if (Array.isArray(_data['proficiencies'])) {
        this.proficiencies = [] as any;
        for (let item of _data['proficiencies'])
          this.proficiencies!.push(Proficiencies.fromJS(item));
      }
      this.armorClass = _data['armorClass'];
      this.hitPoints = _data['hitPoints'];
      this.hitDice = _data['hitDice'];
      this.size = _data['size'];
      if (Array.isArray(_data['speed'])) {
        this.speed = [] as any;
        for (let item of _data['speed']) this.speed!.push(Speed.fromJS(item));
      }
      this.languages = _data['languages'];
      this.alignment = _data['alignment'];
      if (Array.isArray(_data['reactions'])) {
        this.reactions = [] as any;
        for (let item of _data['reactions'])
          this.reactions!.push(CreatureAction.fromJS(item));
      }
      this.picture = _data['picture'];
    }
  }

  static fromJS(data: any): Creature {
    data = typeof data === 'object' ? data : {};
    let result = new Creature();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['strength'] = this.strength;
    data['dexterity'] = this.dexterity;
    data['constitution'] = this.constitution;
    data['intelligence'] = this.intelligence;
    data['wisdom'] = this.wisdom;
    data['charisma'] = this.charisma;
    if (Array.isArray(this.proficiencies)) {
      data['proficiencies'] = [];
      for (let item of this.proficiencies)
        data['proficiencies'].push(item.toJSON());
    }
    data['armorClass'] = this.armorClass;
    data['hitPoints'] = this.hitPoints;
    data['hitDice'] = this.hitDice;
    data['size'] = this.size;
    if (Array.isArray(this.speed)) {
      data['speed'] = [];
      for (let item of this.speed) data['speed'].push(item.toJSON());
    }
    data['languages'] = this.languages;
    data['alignment'] = this.alignment;
    if (Array.isArray(this.reactions)) {
      data['reactions'] = [];
      for (let item of this.reactions) data['reactions'].push(item.toJSON());
    }
    data['picture'] = this.picture;
    super.toJSON(data);
    return data;
  }
}
