import { Client } from './client';
import { JsonPatchDocumentOfNpc, throwException } from '../model/model';
import { Npc } from '../model/npc';

export class NpcsClient extends Client {
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

  getAll(
    page?: number | undefined,
    pageSize?: number | undefined,
    filter?: string | undefined,
    orderBy?: string | null | undefined,
    include?: string | null | undefined,
    expand?: string | null | undefined,
  ): Promise<Npc[]> {
    let url_ = this.baseUrl + '/Npcs?';
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
        return this.processGetAll(_response);
      });
  }

  protected processGetAll(response: Response): Promise<Npc[]> {
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
          for (let item of resultData200) result200!.push(Npc.fromJS(item));
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
    return Promise.resolve<Npc[]>(null as any);
  }

  get(
    id: string,
    include?: string | null | undefined,
    expand?: string | null | undefined,
    filter?: string | undefined,
  ): Promise<Npc> {
    let url_ = this.baseUrl + '/Npcs/{id}?';
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
        return this.processGet(_response);
      });
  }

  protected processGet(response: Response): Promise<Npc> {
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
        result200 = Npc.fromJS(resultData200);
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
    return Promise.resolve<Npc>(null as any);
  }

  patch(
    id: string,
    patchDoc: JsonPatchDocumentOfNpc,
    include?: string | null | undefined,
    expand?: string | null | undefined,
    filter?: string | undefined,
  ): Promise<Npc> {
    let url_ = this.baseUrl + '/Npcs/{id}?';
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
        return this.processPatch(_response);
      });
  }

  protected processPatch(response: Response): Promise<Npc> {
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
        result200 = Npc.fromJS(resultData200);
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
    return Promise.resolve<Npc>(null as any);
  }
}
