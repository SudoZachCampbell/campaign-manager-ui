import { Owned } from './Owned';
import { Region } from './Region';

export interface Continent extends Owned {
  name: string;
  regions?: Region[] | undefined;
  map?: string | undefined;
}
