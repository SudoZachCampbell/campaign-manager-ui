import { Client } from './client';
import { throwException } from '../model/model';
import { LoginAttempt } from '../model/loginAttempt';
import { CreateAttempt } from '../model/createAttempt';
import { Account } from '../model/account';

export class AccountsClient extends Client {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> },
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:5000';
  }

  login(attempt: LoginAttempt): Promise<string> {
    let url_ = this.baseUrl + '/Accounts/Login';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(attempt);

    let options_: RequestInit = {
      body: content_,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processLogin(_response);
      });
  }

  protected processLogin(response: Response): Promise<string> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ''
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          'An unexpected server error occurred.',
          status,
          _responseText,
          _headers,
        );
      });
    }
    return Promise.resolve<string>(null as any);
  }

  createAccount(createAttempt: CreateAttempt): Promise<string> {
    let url_ = this.baseUrl + '/Accounts';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(createAttempt);

    let options_: RequestInit = {
      body: content_,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processCreateAccount(_response);
      });
  }

  protected processCreateAccount(response: Response): Promise<string> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ''
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          'An unexpected server error occurred.',
          status,
          _responseText,
          _headers,
        );
      });
    }
    return Promise.resolve<string>(null as any);
  }

  validateUsername(username: string): Promise<boolean> {
    let url_ = this.baseUrl + '/Accounts/validate/username/{username}';
    if (username === undefined || username === null)
      throw new Error("The parameter 'username' must be defined.");
    url_ = url_.replace('{username}', encodeURIComponent('' + username));
    url_ = url_.replace(/[?&]$/, '');

    let options_: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processValidateUsername(_response);
      });
  }

  protected processValidateUsername(response: Response): Promise<boolean> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ''
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          'An unexpected server error occurred.',
          status,
          _responseText,
          _headers,
        );
      });
    }
    return Promise.resolve<boolean>(null as any);
  }

  validateEmail(email: string): Promise<boolean> {
    let url_ = this.baseUrl + '/Accounts/validate/email/{email}';
    if (email === undefined || email === null)
      throw new Error("The parameter 'email' must be defined.");
    url_ = url_.replace('{email}', encodeURIComponent('' + email));
    url_ = url_.replace(/[?&]$/, '');

    let options_: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processValidateEmail(_response);
      });
  }

  protected processValidateEmail(response: Response): Promise<boolean> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ''
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          'An unexpected server error occurred.',
          status,
          _responseText,
          _headers,
        );
      });
    }
    return Promise.resolve<boolean>(null as any);
  }

  deleteAccount(id: string): Promise<Account> {
    let url_ = this.baseUrl + '/Accounts/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: RequestInit = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processDeleteAccount(_response);
      });
  }

  protected processDeleteAccount(response: Response): Promise<Account> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ''
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = Account.fromJS(resultData200);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          'An unexpected server error occurred.',
          status,
          _responseText,
          _headers,
        );
      });
    }
    return Promise.resolve<Account>(null as any);
  }
}
