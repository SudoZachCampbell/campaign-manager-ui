import { Account } from '../model/Account';
import { Monster } from '../model/Monster';
import { Client } from './Client';
import {
  throwException,
  JsonPatchDocumentOfMonster,
  FileResponse,
} from './Model';

export class MonstersClient extends Client {
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

  getMonsters(
    page?: number | undefined,
    pageSize?: number | undefined,
    filter?: string | undefined,
    orderBy?: string | null | undefined,
    include?: string | null | undefined,
    expand?: string | null | undefined,
  ): Promise<Monster[]> {
    let url_ = this.baseUrl + '/Monsters?';
    if (page === null) throw new Error("The parameter 'page' cannot be null.");
    else if (page !== undefined)
      url_ += 'Page=' + encodeURIComponent('' + page) + '&';
    if (pageSize === null)
      throw new Error("The parameter 'pageSize' cannot be null.");
    else if (pageSize !== undefined)
      url_ += 'PageSize=' + encodeURIComponent('' + pageSize) + '&';
    if (filter === null)
      throw new Error("The parameter 'filter' cannot be null.");
    else if (filter !== undefined)
      url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
    if (orderBy !== undefined && orderBy !== null)
      url_ += 'OrderBy=' + encodeURIComponent('' + orderBy) + '&';
    if (include !== undefined && include !== null)
      url_ += 'Include=' + encodeURIComponent('' + include) + '&';
    if (expand !== undefined && expand !== null)
      url_ += 'Expand=' + encodeURIComponent('' + expand) + '&';
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
        return this.processGetMonsters(_response);
      });
  }

  protected processGetMonsters(response: Response): Promise<Monster[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ''
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as Monster[]);
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
    return Promise.resolve<Monster[]>(null as any);
  }

  createMonster(
    monster: Monster,
    user?: Account | null | undefined,
  ): Promise<string> {
    let url_ = this.baseUrl + '/Monsters';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(monster);

    let options_: RequestInit = {
      body: content_,
      method: 'POST',
      headers: {
        Authorization: user !== undefined && user !== null ? '' + user : '',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processCreateMonster(_response);
      });
  }

  protected processCreateMonster(response: Response): Promise<string> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 201) {
      return response.text().then((_responseText) => {
        let result201: any = null;
        result201 =
          _responseText === ''
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as string);
        return result201;
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

  getMonsterById(
    id: string,
    include?: string | null | undefined,
    expand?: string | null | undefined,
    filter?: string | undefined,
  ): Promise<Monster> {
    let url_ = this.baseUrl + '/Monsters/{id}?';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (include !== undefined && include !== null)
      url_ += 'Include=' + encodeURIComponent('' + include) + '&';
    if (expand !== undefined && expand !== null)
      url_ += 'Expand=' + encodeURIComponent('' + expand) + '&';
    if (filter === null)
      throw new Error("The parameter 'filter' cannot be null.");
    else if (filter !== undefined)
      url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
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
        return this.processGetMonsterById(_response);
      });
  }

  protected processGetMonsterById(response: Response): Promise<Monster> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ''
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as Monster);
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
    return Promise.resolve<Monster>(null as any);
  }

  updateMonsterPATCH(
    id: string,
    patchDoc: JsonPatchDocumentOfMonster,
    include?: string | null | undefined,
    expand?: string | null | undefined,
    filter?: string | undefined,
  ): Promise<Monster> {
    let url_ = this.baseUrl + '/Monsters/{id}?';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (include !== undefined && include !== null)
      url_ += 'Include=' + encodeURIComponent('' + include) + '&';
    if (expand !== undefined && expand !== null)
      url_ += 'Expand=' + encodeURIComponent('' + expand) + '&';
    if (filter === null)
      throw new Error("The parameter 'filter' cannot be null.");
    else if (filter !== undefined)
      url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(patchDoc);

    let options_: RequestInit = {
      body: content_,
      method: 'PATCH',
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
        return this.processUpdateMonsterPATCH(_response);
      });
  }

  protected processUpdateMonsterPATCH(response: Response): Promise<Monster> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ''
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as Monster);
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
    return Promise.resolve<Monster>(null as any);
  }

  updateMonsterPUT(id: string, monster: Monster): Promise<FileResponse | null> {
    let url_ = this.baseUrl + '/Monsters/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(monster);

    let options_: RequestInit = {
      body: content_,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/octet-stream',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processUpdateMonsterPUT(_response);
      });
  }

  protected processUpdateMonsterPUT(
    response: Response,
  ): Promise<FileResponse | null> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200 || status === 206) {
      const contentDisposition = response.headers
        ? response.headers.get('content-disposition')
        : undefined;
      let fileNameMatch = contentDisposition
        ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
            contentDisposition,
          )
        : undefined;
      let fileName =
        fileNameMatch && fileNameMatch.length > 1
          ? fileNameMatch[3] || fileNameMatch[2]
          : undefined;
      if (fileName) {
        fileName = decodeURIComponent(fileName);
      } else {
        fileNameMatch = contentDisposition
          ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
          : undefined;
        fileName =
          fileNameMatch && fileNameMatch.length > 1
            ? fileNameMatch[1]
            : undefined;
      }
      return response.blob().then((blob) => {
        return {
          fileName: fileName,
          data: blob,
          status: status,
          headers: _headers,
        };
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
    return Promise.resolve<FileResponse | null>(null as any);
  }

  deleteMonster(id: string): Promise<Monster> {
    let url_ = this.baseUrl + '/Monsters/{id}';
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
        return this.processDeleteMonster(_response);
      });
  }

  protected processDeleteMonster(response: Response): Promise<Monster> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ''
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as Monster);
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
    return Promise.resolve<Monster>(null as any);
  }

  getEnum(name: string): Promise<string[]> {
    let url_ = this.baseUrl + '/Monsters/GetEnum/{name}';
    if (name === undefined || name === null)
      throw new Error("The parameter 'name' must be defined.");
    url_ = url_.replace('{name}', encodeURIComponent('' + name));
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
        return this.processGetEnum(_response);
      });
  }

  protected processGetEnum(response: Response): Promise<string[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ''
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as string[]);
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
    return Promise.resolve<string[]>(null as any);
  }
}