import _ from 'lodash';

import RequestBuilder from './dndDb';
import { IMonster } from '../interfaces/Models'

export const getMonster: object = async function(name: string): Promise<IMonster> {
    let apiMonster: object = await RequestBuilder.get(`http://www.dnd5eapi.co/api/`)
    const monster: object =  _.mapKeys(apiMonster, (value, key) => {
        return key.replace('_', '');
    });
    return <IMonster> monster;
}
