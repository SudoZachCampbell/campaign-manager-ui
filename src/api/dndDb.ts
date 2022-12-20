import RequestBuilder, { QueryParams, RequestType } from './requestBuilder';
import _ from 'lodash';
import { ITableList, ITableRows } from '../interfaces/Models';
import { Patch } from '../interfaces/Requests';
import { Base, Monster, MonstersClient } from './Model';

export enum PatchType {
  Add = 'add',
  Remove = 'remove',
  List = 'list',
}

export const getTable = async function <T extends Base>(
  type: Type,
  queryParams: QueryParams,
): Promise<ITableList<T>> {
  console.log(`dndDb.ts:17 queryParams`, queryParams);
  const client = new MonstersClient();
  const yeet = await client.getMonsters();
  const entitiesArray: T[] = await getEntities<T>(type, queryParams);
  console.log(`dndDb.ts:19 entitiesArray`, entitiesArray);
  const entities: ITableRows<T> = entitiesArray.reduce((accum, entity) => {
    accum[entity.id] = entity;
    return accum;
  }, {});
  const properties = queryParams.include?.map((x) => {
    const splitHeader = x.split('.');
    if (splitHeader.length > 1) {
      return splitHeader.map(_.startCase).join(' ');
    } else {
      return _.startCase(x);
    }
  });
  const tableData: ITableList<T> = {
    headers: properties ?? [],
    data: entities,
  };
  return tableData;
};

export const getEntity = async function <T>(
  type: Type,
  id: string,
  queryParams?: QueryParams,
): Promise<T> {
  return await RequestBuilder[RequestType.GET]({
    url: `${process.env.REACT_APP_SERVER_URL}/${type}/${id}`,
    queryParams,
  });
};

export const getEntities = async function <T>(
  type: Type,
  queryParams: QueryParams,
): Promise<T[]> {
  return await RequestBuilder[RequestType.GET]({
    url: `${process.env.REACT_APP_SERVER_URL}/${type}`,
    queryParams,
  });
};

export const getEntityTable = async function <T>(
  type: Type,
  queryParams: QueryParams,
): Promise<T[]> {
  return await RequestBuilder[RequestType.GET]({
    url: `${process.env.REACT_APP_SERVER_URL}/${type}`,
    queryParams,
  });
};

export const getEntitiesByFilter = async function <T>(
  type: Type,
  queryParams: QueryParams,
): Promise<T[]> {
  return await RequestBuilder[RequestType.GET]({
    url: `${process.env.REACT_APP_SERVER_URL}/${type}/`,
    queryParams,
  });
};

export const updateEntity = async function <T>(
  type: Type,
  id: string,
  patchType: PatchType,
  path: string,
  expand: string[],
  value?: string | number,
  patchList: Patch[] = [],
): Promise<T> {
  const url = `${process.env.REACT_APP_SERVER_URL}/${type}/${id}${
    expand ? `?expand=${expand.join(',')}` : ''
  }`;
  let body: Patch[] = [];
  if (patchType === PatchType.List) {
    body = patchList;
  } else {
    body = [
      {
        op: patchType,
        path,
        value,
      },
    ];
  }

  return await RequestBuilder[RequestType.PATCH]({
    url,
    body: JSON.stringify(body),
  });
};

export const getEnumValues = async function (
  type: Type,
  name: string,
): Promise<string[]> {
  return await RequestBuilder[RequestType.GET]({
    url: `${process.env.REACT_APP_SERVER_URL}/${type}/GetEnum/${_.upperFirst(
      _.camelCase(name),
    )}`,
  });
};

export enum Type {
  MONSTER = 'monsters',
  NPC = 'npcs',
  BUILDING = 'buildings',
  LOCALE = 'locales',
  REGION = 'regions',
  CONTINENT = 'continents',
}
