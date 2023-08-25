export class LoginAttempt {
  username?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;

  init(_data?: any) {
    if (_data) {
      this.username = _data['username'];
      this.email = _data['email'];
      this.password = _data['password'];
    }
  }

  static fromJS(data: any): LoginAttempt {
    data = typeof data === 'object' ? data : {};
    let result = new LoginAttempt();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['username'] = this.username;
    data['email'] = this.email;
    data['password'] = this.password;
    return data;
  }
}
