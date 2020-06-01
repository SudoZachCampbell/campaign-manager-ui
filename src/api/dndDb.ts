import RequestBuilder, { RequestType } from './requestBuilder';
import _ from 'lodash';
import { ITableList, IModel, IMonster } from '../interfaces/Models';

export const getTable = async function <T extends IModel>(type: Type, columns: string[]): Promise<[ITableList, { [id: number]: T}]> {
    const entitiesArray: T[] = await getEntities<T>(type, ["Monster", "Building"]);
    const entities: { [id: number]: T} = entitiesArray.reduce((accum, entity) => {
        accum[entity.id] = entity;
        return accum;
    }, {});
    console.log(`${type} List Data: `, entities);
    const properties = columns.map(x => {
        const splitHeader = x.split('.');
        if(splitHeader.length > 1) {
            return splitHeader.map(_.startCase).join(' ');
        } else {
            return _.startCase(x);
        }
    });
    const tableData: ITableList = {
        headers: properties,
        data: _.map(entities, entity => {
            return columns.reduce((accum, property) => {
                accum[property] = _.get(entity, property);
                return accum;
            }, {})
        })
    }
    console.log(`${type} Table Data: `, tableData)
    return [tableData, entities];
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
