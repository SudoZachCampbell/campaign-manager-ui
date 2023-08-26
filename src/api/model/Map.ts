import { BuildingMap } from './BuildingMap';
import { Locale } from './Locale';
import { Owned } from './Owned';

export interface Map extends Owned {
  name: string;
  variation: string;
  imageUrl: string;
  center?: any[] | undefined;
  localeId: string;
  locale?: Locale | undefined;
  buildings?: BuildingMap[] | undefined;
}
