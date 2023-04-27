import RequestBuilder, { QueryParams, RequestType } from './requestBuilder';
import _ from 'lodash';
import { ITableList, ITableRows } from '../interfaces/Models';
import { Patch } from '../interfaces/Requests';
import {
  Base,
  BuildingsClient,
  ContinentsClient,
  LocalesClient,
  Monster,
  MonstersClient,
  NpcsClient,
  RegionsClient,
} from './Model';
import { useState } from 'react';

export enum PatchType {
  Add = 'add',
  Remove = 'remove',
  List = 'list',
}

export const useDnDApi = <T extends Base>(call: Promise<T>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<T>();

  const invoke = async () => {
    setLoading(true);
    const data = await call;
    setResponse(data);
    setLoading(false);
  };

  return { loading, invoke, response };
};

export const useDndCollectionApi = <T extends Base>(call: Promise<T[]>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<T[]>();

  const invoke = async () => {
    setLoading(true);
    const data = await call;
    setResponse(data);
    setLoading(false);
  };

  return { loading, invoke, response };
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

export enum ApiType {
  MONSTER,
  NPC,
  BUILDING,
  LOCALE,
  REGION,
  CONTINENT,
}

export const ApiClients = {
  [ApiType.MONSTER]: new MonstersClient(),
  [ApiType.NPC]: new NpcsClient(),
  [ApiType.BUILDING]: new BuildingsClient(),
  [ApiType.LOCALE]: new LocalesClient(),
  [ApiType.REGION]: new RegionsClient(),
  [ApiType.CONTINENT]: new ContinentsClient(),
};
