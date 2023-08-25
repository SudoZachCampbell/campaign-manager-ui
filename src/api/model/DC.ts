export class DC {
  dcType!: string;
  dcValue!: number;
  successType!: string;

  init(_data?: any) {
    if (_data) {
      this.dcType = _data['dcType'];
      this.dcValue = _data['dcValue'];
      this.successType = _data['successType'];
    }
  }

  static fromJS(data: any): DC {
    data = typeof data === 'object' ? data : {};
    let result = new DC();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['dcType'] = this.dcType;
    data['dcValue'] = this.dcValue;
    data['successType'] = this.successType;
    return data;
  }
}
