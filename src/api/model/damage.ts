export class Damage {
  damageType!: string;
  damageDice!: string;
  damageBonus?: number | undefined;

  init(_data?: any) {
    if (_data) {
      this.damageType = _data['damageType'];
      this.damageDice = _data['damageDice'];
      this.damageBonus = _data['damageBonus'];
    }
  }

  static fromJS(data: any): Damage {
    data = typeof data === 'object' ? data : {};
    let result = new Damage();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['damageType'] = this.damageType;
    data['damageDice'] = this.damageDice;
    data['damageBonus'] = this.damageBonus;
    return data;
  }
}
