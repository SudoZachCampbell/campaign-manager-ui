import { Base } from './base';

import { Monster } from './monster';

export class Account extends Base {
  username!: string;
  email!: string;
  password?: string | undefined;
  role?: string | undefined;
  monsters?: Monster[] | undefined;

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.username = _data['username'];
      this.email = _data['email'];
      this.password = _data['password'];
      this.role = _data['role'];
      if (Array.isArray(_data['monsters'])) {
        this.monsters = [] as any;
        for (let item of _data['monsters'])
          this.monsters!.push(Monster.fromJS(item));
      }
    }
  }

  static fromJS(data: any): Account {
    data = typeof data === 'object' ? data : {};
    let result = new Account();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['username'] = this.username;
    data['email'] = this.email;
    data['password'] = this.password;
    data['role'] = this.role;
    if (Array.isArray(this.monsters)) {
      data['monsters'] = [];
      for (let item of this.monsters) data['monsters'].push(item.toJSON());
    }
    super.toJSON(data);
    return data;
  }
}
