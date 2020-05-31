import RequestBuilder, { RequestType } from './requestBuilder';
import _ from 'lodash';
import { ITableList } from '../interfaces/Models';

export const getTable = async function <T>(type: Type, columns: string[]): Promise<ITableList> {
    const entities = await getEntities<T>(type);
    console.log(`${type} List Data: `, entities);
    const data: ITableList = {
        headers: columns.map(_.startCase),
        data: entities.map(entity => _.pick(entity, columns))
    }
    return data;
}

export const getEntity = async function <T>(type: Type, id: number): Promise<T> {
    return await RequestBuilder[RequestType.GET](`http://localhost:53596/${type}/${id}`);
}

export const getEntities = async function <T>(type: Type): Promise<T[]> {
    return await RequestBuilder[RequestType.GET](`http://localhost:53596/${type}`)
}


export enum Type {
    Monster = "Monster",
    Npc = "Npc"
}
