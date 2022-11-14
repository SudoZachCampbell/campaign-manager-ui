import RequestBuilder, { RequestType } from './requestBuilder';
import _ from 'lodash';
import { IModel, ITableList, ITableRows } from '../interfaces/Models';
import { Patch } from '../interfaces/Requests';

export enum PatchType {
  Add = 'add',
  Remove = 'remove',
  List = 'list',
}

export const getTable = async function <T extends IModel>(
  type: Type,
  columns: string[],
  include?: string[],
): Promise<[ITableList<T>, { [id: number]: T }]> {
  const entitiesArray: T[] = await getEntities<T>(type, include);
  const entities: ITableRows<T> = entitiesArray.reduce((accum, entity) => {
    accum[entity.id] = entity;
    return accum;
  }, {});
  console.log(`${type} List Data: `, entities);
  const properties = columns.map((x) => {
    const splitHeader = x.split('.');
    if (splitHeader.length > 1) {
      return splitHeader.map(_.startCase).join(' ');
    } else {
      return _.startCase(x);
    }
  });
  const tableData: ITableList<T> = {
    headers: properties,
    data: _.reduce(
      entities,
      (accum, entity: T) => {
        accum[entity.id] = columns.reduce(
          (innerAccum: ITableRows<T>, property) => {
            innerAccum[property] = _.get(entity, property);
            return innerAccum;
          },
          {},
        );
        return accum;
      },
      {},
    ),
    fullData: entities,
  };
  console.log(`${type} Table Data: `, tableData);
  return [tableData, entities];
};

export const getEntity = async function <T>(
  type: Type,
  id: string,
  include?: string[],
): Promise<T> {
  return await RequestBuilder[RequestType.GET](
    `${process.env.REACT_APP_SERVER_URL}/${type}/${id}${
      include ? `?include=${include.join(',')}` : ''
    }`,
  );
};

export const getEntities = async function <T>(
  type: Type,
  include?: string[],
): Promise<T[]> {
  return await RequestBuilder[RequestType.GET](
    `${process.env.REACT_APP_SERVER_URL}/${type}${
      include ? `?include=${include.join(',')}` : ''
    }`,
  );
};

export const getEntitiesByFilter = async function <T>(
  type: Type,
  filterType: Type,
  filterId: number,
  include: string[],
): Promise<T[]> {
  return await RequestBuilder[RequestType.GET](
    `${process.env.REACT_APP_SERVER_URL}/${type}/${filterType}/${filterId}${
      include ? `?include=${include.join(',')}` : ''
    }`,
  );
};

export const updateEntity = async function <T>(
  type: Type,
  id: string,
  patchType: PatchType,
  path: string,
  include: string[],
  value?: string | number,
  patchList: Patch[] = [],
): Promise<T> {
  const url = `${process.env.REACT_APP_SERVER_URL}/${type}/${id}${
    include ? `?include=${include.join(',')}` : ''
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

  return await RequestBuilder[RequestType.PATCH](url, JSON.stringify(body));
};

export const getEnumValues = async function (
  type: Type,
  name: string,
): Promise<string[]> {
  return await RequestBuilder[RequestType.GET](
    `${process.env.REACT_APP_SERVER_URL}/${type}/GetEnum/${_.upperFirst(
      _.camelCase(name),
    )}`,
  );
};

export enum Type {
  MONSTER = 'monsters',
  NPC = 'npcs',
  BUILDING = 'buildings',
  LOCALE = 'locales',
  REGION = 'regions',
  CONTINENT = 'continents',
}
