/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export class Client {
  authToken = '';
  protected constructor() {}

  setAuthToken(token: string) {
    this.authToken = token;
  }

  protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
    // @ts-ignore
    options.headers['Authorization'] = `Bearer ${this.authToken}`;
    return Promise.resolve(options);
  };
}
