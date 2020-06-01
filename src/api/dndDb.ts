import RequestBuilder, { RequestType } from './requestBuilder';
import _ from 'lodash';
import { ITableList } from '../interfaces/Models';

export const getTable = async function <T>(type: Type, columns: string[]): Promise<ITableList> {
    const entities = await getEntities<T>(type, ["Monster", "Building"]);
    console.log(`${type} List Data: `, entities);
    const properties = columns.map(x => {
        const splitHeader = x.split('.');
        if(splitHeader.length > 1) {
            return splitHeader.map(_.startCase).join(' ');
        } else {
            return _.startCase(x);
        }
    });
    const data: ITableList = {
        headers: properties,
        data: entities.map(entity => {
            return columns.map(property => {
                return _.get(entity, property)
            })
        })
    }
    console.log(`${type} Table Data: `, data)
    return data;
}

export const getEntity = async function <T>(type: Type, id: number): Promise<T> {
    return await RequestBuilder[RequestType.GET](`http://localhost:53596/${type}/${id}`);
}

export const getEntities = async function <T>(type: Type, include: string[]): Promise<T[]> {
    return await RequestBuilder[RequestType.GET](`http://localhost:53596/${type}${include ? `?include=${include.join(',')}` : ''}`);
}


export enum Type {
    Monster = "Monster",
    Npc = "Npc"
}
