import { BaseDto } from '../api/model';
import { FieldType, ToggleType } from './Lookups';

export interface ITableList<T> {
  headers: string[];
  data: ITableRows<T>;
}

export interface ITableRows<T> {
  [id: number]: T;
}

//#endregion

//#region WAMS Metadata

export interface Field<T extends BaseDto> {
  name: Extract<keyof T, string>;
  type: FieldType;
  addInfo?: string;
  addField?: keyof T;
  toggleType?: ToggleType;
}

//#endregion
