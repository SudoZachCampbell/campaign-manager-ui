export class Base {
  id!: string;

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
    }
  }

  static fromJS(data: any): Base {
    data = typeof data === 'object' ? data : {};
    let result = new Base();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    return data;
  }
}
