import _ from 'lodash';
import apiTypes from '../requestBuilder';
import { ListResponse } from './open5e.model';

export const list = async <T extends any>() => {
  let apiResult: ListResponse<T> = await apiTypes.GET({
    url: `https://api.open5e.com/v1/monsters`,
  });
  console.log(`open5e.ts:9 apiResult`, apiResult);
  const monsters = apiResult.results;
  return <T[]>monsters;
};
