import RequestBuilder, { RequestType } from './requestBuilder';
import _ from 'lodash';
import { IModel, IMonster, ITableList, ITableRows } from '../interfaces/Models';
import { YoutubeSearchedFor } from '@material-ui/icons';
import { Patch } from '../interfaces/Requests';

export const getTable = async function <T extends IModel>(type: Type, columns: string[], include: string[]): Promise<[ITableList<T>, { [id: number]: T }]> {
    const entitiesArray: T[] = await getEntities<T>(type, include);
    const entities: ITableRows<T> = entitiesArray.reduce((accum, entity) => {
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
            accum[entity.id] = columns.reduce((innerAccum: ITableRows<T>, property) => {
                innerAccum[property] = _.get(entity, property);
                return innerAccum;
            }, {})
            return accum;
        }, {})
    }
    console.log(`${type} Table Data: `, tableData)
    return [tableData, entities];
}

export const getEntity = async function <T>(type: Type, id: number, include: string[]): Promise<T> {
    return await RequestBuilder[RequestType.GET](`http://localhost:53596/${type}/${id}${include ? `?include=${include.join(',')}` : ''}`);
}

export const getEntities = async function <T>(type: Type, include: string[]): Promise<T[]> {
    return await RequestBuilder[RequestType.GET](`http://localhost:53596/${type}${include ? `?include=${include.join(',')}` : ''}`);
}

export const updateEntity = async function <T>(type: Type, id: number, patchType: PatchType, path: string, value?: string, patchList: Patch[] = []): Promise<T> {
    const url = `http://localhost:53596/${type}/${id}`
    let body: Patch[] = []
    if(patchType === PatchType.List) {
        body = patchList;
    } else {
        body = [
            {
                op: patchType,
                path,
                value
            }
        ]
    }

    return await RequestBuilder[RequestType.PATCH](url, JSON.stringify(body))
}


export enum Type {
    Monster = "Monster",
    Npc = "Npc"
}

export enum PatchType {
    Add = 'add',
    Remove = 'remove',
    List = 'list'
}
