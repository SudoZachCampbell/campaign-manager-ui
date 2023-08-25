import { Base } from './base';
import { Account } from './account';

export class Owned extends Base {
  ownerId!: string;
  owner?: Account | undefined;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.ownerId = _data['ownerId'];
      this.owner = _data['owner']
        ? Account.fromJS(_data['owner'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): Owned {
    data = typeof data === 'object' ? data : {};
    let result = new Owned();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['ownerId'] = this.ownerId;
    data['owner'] = this.owner ? this.owner.toJSON() : <any>undefined;
    super.toJSON(data);
    return data;
  }
}
