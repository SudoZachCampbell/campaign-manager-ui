import RequestBuilder from './request-builder';
import { IMonster } from '../interfaces/Models'

export const getMonster: object = async (name: string): Promise<object> => {
    let monster: object = await RequestBuilder.get<IMonster>(`http://www.dnd5eapi.co/api/`)
    let
}
