export class Usage {
  type!: string;
  times?: number | undefined;
  minValue?: number | undefined;

  init(_data?: any) {
    if (_data) {
      this.type = _data['type'];
      this.times = _data['times'];
      this.minValue = _data['minValue'];
    }
  }

  static fromJS(data: any): Usage {
    data = typeof data === 'object' ? data : {};
    let result = new Usage();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['type'] = this.type;
    data['times'] = this.times;
    data['minValue'] = this.minValue;
    return data;
  }
}
