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

export interface Field {
  name: string;
  type: FieldType;
  addInfo?: string;
  addField?: string;
  toggleType?: ToggleType;
}

//#endregion
