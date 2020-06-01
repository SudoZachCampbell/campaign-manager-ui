import RequestBuilder, { RequestType } from './requestBuilder';
import _ from 'lodash';
import { IModel, IMonster, ITableList, ITableRow } from '../interfaces/Models';
import { YoutubeSearchedFor } from '@material-ui/icons';

export const getTable = async function <T extends IModel>(type: Type, columns: string[]): Promise<[ITableList<T>, { [id: number]: T }]> {
    const entitiesArray: T[] = await getEntities<T>(type, ["Monster", "Building", "Locale"]);
    const entities: ITableRow<T> = entitiesArray.reduce((accum, entity) => {
        accum[entity.id] = entity;
        return accum;
    }, {});
    console.log(`${type} List Data: `, entities);
    const properties = columns.map(x => {
        const splitHeader = x.split('.');
        if (splitHeader.length > 1) {
            return splitHeader.map(_.startCase).join(' ');
        } else {
            return _.startCase(x);
        }
    });
    const tableData: ITableList<T> = {
        headers: properties,
        data: _.reduce(entities, (accum, entity: T) => {
            accum[entity.id] = columns.reduce((innerAccum: ITableRow<T>, property) => {
                innerAccum[property] = _.get(entity, property);
                return innerAccum;
            }, {})
            return accum;
        }, {})
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
