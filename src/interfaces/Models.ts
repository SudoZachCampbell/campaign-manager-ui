import React from 'react';
import { FieldType, ToggleType } from './Lookups';

export interface IModel {
  id: string;
  name: string;
}

//#region Creatures
export interface ICreature extends IModel {
  alignment: number;
  hit_points: number;
  picture?: string;
}

export interface INpc extends IModel {
  background?: string;
  noteable_events?: string[];
  beliefs?: string[];
  passions?: string[];
  flaws?: string[];
  picture?: string;
  monster?: IMonster;
  locale?: ILocale;
  building?: IBuilding;
}

export interface IMonster extends ICreature {
  passive_perception: number;
}

//#endregion

//#region Locations

export interface ILocation extends IModel {}

export interface IContinent extends ILocation {
  regions?: IRegion[];
}

export interface IRegion extends ILocation {
  continent: IContinent;
  locales?: ILocale[];
}

export interface ILocale extends ILocation {
  maps?: IMap[];
  region: IRegion;
  buildings?: IBuilding[];
}

export interface IMap extends ILocation {
  image_url: string;
  center?: number[];
  locale?: ILocale;
  variation?: string;
  buildings?: [
    {
      building: IBuilding;
      coords: number[];
    },
  ];
}

export interface IBuilding extends ILocation {
  locale: ILocale;
  npcs: INpc[];
  monsters: IMonster[];
  maps?: [
    {
      map: IMap;
      coords: number[];
    },
  ];
}

//#endregion

export interface ITableList<T> {
  headers: string[];
  data: ITableRows<T>;
  fullData: ITableRows<T>;
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
