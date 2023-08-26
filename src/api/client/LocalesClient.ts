import { Locale } from '../model/Locale';
import { Client } from './Client';
import { throwException } from './Model';

export class LocalesClient extends Client {
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

  getLocale(
    id: string,
    include?: string | null | undefined,
    expand?: string | null | undefined,
    filter?: string | undefined,
  ): Promise<Locale> {
    let url_ = this.baseUrl + '/Locales/{id}?';
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
        return this.processGetLocale(_response);
      });
  }

  protected processGetLocale(response: Response): Promise<Locale> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as Locale);
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
    return Promise.resolve<Locale>(null as any);
  }

  getRegionsFromContinent(
    regionId: number,
    page?: number | undefined,
    pageSize?: number | undefined,
    filter?: string | undefined,
    orderBy?: string | null | undefined,
    include?: string | null | undefined,
    expand?: string | null | undefined,
  ): Promise<Locale[]> {
    let url_ = this.baseUrl + '/Locales/Region/{regionId}?';
    if (regionId === undefined || regionId === null)
      throw new Error("The parameter 'regionId' must be defined.");
    url_ = url_.replace('{regionId}', encodeURIComponent('' + regionId));
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
        return this.processGetRegionsFromContinent(_response);
      });
  }

  protected processGetRegionsFromContinent(
    response: Response,
  ): Promise<Locale[]> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as Locale[]);
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
    return Promise.resolve<Locale[]>(null as any);
  }
}
