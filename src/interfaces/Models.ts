import React from 'react';
import { Base } from '../api/Model';
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

export interface Field<T extends Base> {
  name: Extract<keyof T, string>;
  type: FieldType;
  addInfo?: string;
  addField?: keyof T;
  toggleType?: ToggleType;
}

//#endregion
