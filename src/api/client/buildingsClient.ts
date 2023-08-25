import { Client } from './client';
import {
  FileResponse,
  JsonPatchDocumentOfBuilding,
  throwException,
} from '../model/model';
import { Building } from '../model/building';

export class BuildingsClient extends Client {
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

  getBuildingsFromLocale(
    localeId: string,
    page?: number | undefined,
    pageSize?: number | undefined,
    filter?: string | undefined,
    orderBy?: string | null | undefined,
    include?: string | null | undefined,
    expand?: string | null | undefined,
  ): Promise<Building[]> {
    let url_ = this.baseUrl + '/Buildings/Locale/{localeId}?';
    if (localeId === undefined || localeId === null)
      throw new Error("The parameter 'localeId' must be defined.");
    url_ = url_.replace('{localeId}', encodeURIComponent('' + localeId));
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
        return this.processGetBuildingsFromLocale(_response);
      });
  }

  protected processGetBuildingsFromLocale(
    response: Response,
  ): Promise<Building[]> {
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
            result200!.push(Building.fromJS(item));
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
    return Promise.resolve<Building[]>(null as any);
  }

  getBuildingById(
    id: string,
    include?: string | null | undefined,
    expand?: string | null | undefined,
    filter?: string | undefined,
  ): Promise<Building> {
    let url_ = this.baseUrl + '/Buildings/{id}?';
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
        return this.processGetBuildingById(_response);
      });
  }

  protected processGetBuildingById(response: Response): Promise<Building> {
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
        result200 = Building.fromJS(resultData200);
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
    return Promise.resolve<Building>(null as any);
  }

  patchBuilding(
    id: string,
    patchDoc: JsonPatchDocumentOfBuilding,
    include?: string | null | undefined,
    expand?: string | null | undefined,
    filter?: string | undefined,
  ): Promise<Building> {
    let url_ = this.baseUrl + '/Buildings/{id}?';
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
        return this.processPatchBuilding(_response);
      });
  }

  protected processPatchBuilding(response: Response): Promise<Building> {
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
        result200 = Building.fromJS(resultData200);
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
    return Promise.resolve<Building>(null as any);
  }

  putBuilding(id: string, building: Building): Promise<FileResponse | null> {
    let url_ = this.baseUrl + '/Buildings/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(building);

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
        return this.processPutBuilding(_response);
      });
  }

  protected processPutBuilding(
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

  deleteBuilding(id: string): Promise<Building> {
    let url_ = this.baseUrl + '/Buildings/{id}';
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
        return this.processDeleteBuilding(_response);
      });
  }

  protected processDeleteBuilding(response: Response): Promise<Building> {
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
        result200 = Building.fromJS(resultData200);
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
    return Promise.resolve<Building>(null as any);
  }

  postBuilding(building: Building): Promise<Building> {
    let url_ = this.baseUrl + '/Buildings';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(building);

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
        return this.processPostBuilding(_response);
      });
  }

  protected processPostBuilding(response: Response): Promise<Building> {
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
        result200 = Building.fromJS(resultData200);
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
    return Promise.resolve<Building>(null as any);
  }

  getEnum(name: string): Promise<string[]> {
    let url_ = this.baseUrl + '/Buildings/GetEnum/{name}';
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
