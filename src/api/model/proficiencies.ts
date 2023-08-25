export class Proficiencies {
  name!: string;
  value!: number;

  init(_data?: any) {
    if (_data) {
      this.name = _data['name'];
      this.value = _data['value'];
    }
  }

  static fromJS(data: any): Proficiencies {
    data = typeof data === 'object' ? data : {};
    let result = new Proficiencies();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['value'] = this.value;
    return data;
  }
}
