import { Monster } from '../model';

export interface ListResponse<T> {
  count: number;
  next: URL;
  previous?: URL;
  results: T[];
}

export interface OpenMonster extends Monster {
  slug: string;
}
