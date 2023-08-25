import { Client } from './client';
import {
  FileResponse,
  JsonPatchDocumentOfContinent,
  throwException,
} from '../model/model';
import { Continent } from '../model/continent';

export class ContinentsClient extends Client {
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

  getContinents(
    page?: number | undefined,
    pageSize?: number | undefined,
    filter?: string | undefined,
    orderBy?: string | null | undefined,
    include?: string | null | undefined,
    expand?: string | null | undefined,
  ): Promise<Continent[]> {
    let url_ = this.baseUrl + '/Continents?';
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
        return this.processGetContinents(_response);
      });
  }

  protected processGetContinents(response: Response): Promise<Continent[]> {
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
        if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200)
            result200!.push(Continent.fromJS(item));
        } else {
          result200 = <any>null;
        }
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
    return Promise.resolve<Continent[]>(null as any);
  }

  postContinent(continent: Continent): Promise<Continent> {
    let url_ = this.baseUrl + '/Continents';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(continent);

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
        return this.processPostContinent(_response);
      });
  }

  protected processPostContinent(response: Response): Promise<Continent> {
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
        result200 = Continent.fromJS(resultData200);
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
    return Promise.resolve<Continent>(null as any);
  }

  getContinentById(
    id: string,
    include?: string | null | undefined,
    expand?: string | null | undefined,
    filter?: string | undefined,
  ): Promise<Continent> {
    let url_ = this.baseUrl + '/Continents/{id}?';
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
        return this.processGetContinentById(_response);
      });
  }

  protected processGetContinentById(response: Response): Promise<Continent> {
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
        result200 = Continent.fromJS(resultData200);
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
    return Promise.resolve<Continent>(null as any);
  }

  patchContinent(
    id: string,
    patchDoc: JsonPatchDocumentOfContinent,
    include?: string | null | undefined,
    expand?: string | null | undefined,
    filter?: string | undefined,
  ): Promise<Continent> {
    let url_ = this.baseUrl + '/Continents/{id}?';
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
        return this.processPatchContinent(_response);
      });
  }

  protected processPatchContinent(response: Response): Promise<Continent> {
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
        result200 = Continent.fromJS(resultData200);
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
    return Promise.resolve<Continent>(null as any);
  }

  putContinent(id: string, continent: Continent): Promise<FileResponse | null> {
    let url_ = this.baseUrl + '/Continents/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(continent);

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
        return this.processPutContinent(_response);
      });
  }

  protected processPutContinent(
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

  deleteContinent(id: string): Promise<Continent> {
    let url_ = this.baseUrl + '/Continents/{id}';
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
        return this.processDeleteContinent(_response);
      });
  }

  protected processDeleteContinent(response: Response): Promise<Continent> {
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
        result200 = Continent.fromJS(resultData200);
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
    return Promise.resolve<Continent>(null as any);
  }

  getEnum(name: string): Promise<string[]> {
    let url_ = this.baseUrl + '/Continents/GetEnum/{name}';
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
        let resultData200 =
          _responseText === ''
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200) result200!.push(item);
        } else {
          result200 = <any>null;
        }
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
