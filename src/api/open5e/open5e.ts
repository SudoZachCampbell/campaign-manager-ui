import apiTypes from '../requestBuilder';
import { ListResponse } from './open5e.model';

export const list = async <T extends any>() => {
  let apiResult: ListResponse<T> = await apiTypes.GET({
    url: `https://api.open5e.com/v1/monsters`,
  });
  const monsters = apiResult.results;
  return <T[]>monsters;
};
