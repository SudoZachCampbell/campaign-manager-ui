import _ from 'lodash';
import { useState } from 'react';
import { Patch } from '../interfaces/Requests';
import {
  ApiException,
  BaseDto,
  BuildingsClient,
  ContinentsClient,
  LocalesClient,
  MonstersClient,
  NpcsClient,
  RegionsClient,
} from './model';
import RequestBuilder, { RequestType } from './requestBuilder';

export enum PatchType {
  Add = 'add',
  Remove = 'remove',
  List = 'list',
}

export enum ApiType {
  MONSTER,
  NPC,
  BUILDING,
  LOCALE,
  REGION,
  CONTINENT,
}

export const useDnDApi = <T extends BaseDto | string>(
  call: (...props: any[]) => Promise<T>,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<T>();
  const [apiError, setApiError] = useState<ApiException>();

  const invoke = async (...props: any[]) => {
    setLoading(true);
    try {
      setResponse(await call(...props));
    } catch (e) {
      setApiError(e as ApiException);
    }
    setLoading(false);
  };

  return { loading, invoke, response, apiError };
};

export const useDndCollectionApi = <T extends BaseDto>(
  call: (...props: any[]) => Promise<T[]>,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<T[]>();
  const [apiError, setApiError] = useState<ApiException>();

  const invoke = async (...props: any[]) => {
    setLoading(true);
    try {
      setResponse(await call(...props));
    } catch (e) {
      setApiError(e as ApiException);
    }
    setLoading(false);
  };

  return { loading, invoke, response, apiError };
};

export const buildJsonPatch = (
  patchType: PatchType,
  path: string,
  value?: string | number,
  patchList: Patch[] = [],
) => {
  if (patchType === PatchType.List) {
    return patchList;
  } else {
    return [
      {
        op: patchType,
        path,
        value,
      },
    ];
  }
};

export const getEnumValues = async function (
  type: ApiType,
  name: string,
): Promise<string[]> {
  return await RequestBuilder[RequestType.GET]({
    url: `${process.env.REACT_APP_SERVER_URL}/${type}/GetEnum/${_.upperFirst(
      _.camelCase(name),
    )}`,
  });
};

export const ApiClients = {
  [ApiType.MONSTER]: new MonstersClient(),
  [ApiType.NPC]: new NpcsClient(),
  [ApiType.BUILDING]: new BuildingsClient(),
  [ApiType.LOCALE]: new LocalesClient(),
  [ApiType.REGION]: new RegionsClient(),
  [ApiType.CONTINENT]: new ContinentsClient(),
};
