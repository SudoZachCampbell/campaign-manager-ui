import RequestBuilder, { RequestType } from './requestBuilder';

// export const getTable = async function <T>(type: Type): Promise<T> {
//     return await RequestBuilder[RequestType.GET](`http://localhost:53596/${type}/Table`);
// }

export const getEntity = async function <T>(type: Type, id: number): Promise<T> {
    return await RequestBuilder[RequestType.GET](`http://localhost:53596/${type}/${id}`);
}

export const getEntities = async function <T>(type: Type): Promise<T> {
    return await RequestBuilder[RequestType.GET](`http://localhost:53596/${type}`)
}


export enum Type {
    Monster = "Monster",
    Npc = "Npc"
}
