export class Speed {
  name!: string;
  value!: number;
  measurement!: string;

  init(_data?: any) {
    if (_data) {
      this.name = _data['name'];
      this.value = _data['value'];
      this.measurement = _data['measurement'];
    }
  }

  static fromJS(data: any): Speed {
    data = typeof data === 'object' ? data : {};
    let result = new Speed();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['value'] = this.value;
    data['measurement'] = this.measurement;
    return data;
  }
}
