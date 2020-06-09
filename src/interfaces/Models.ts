import { FieldType, ToggleType } from './Lookups';

export interface IModel {
    id: number,
    name: string
}

//#region Creatures
export interface ICreature extends IModel {
    alignment: number,
    hit_points: number,
    picture?: string
}

export interface INpc extends IModel {
    background?: string,
    noteable_events?: string[],
    beliefs?: string[],
    passions?: string[],
    flaws?: string[],
    picture?: string,
    monster?: IMonster,
    locale?: ILocale,
    building?: IBuilding
}

export interface IMonster extends ICreature {
    passive_perception: number
}

//#endregion

//#region Locations

export interface ILocation extends IModel {

}

export interface ILocale extends ILocation {
}

export interface IBuilding extends ILocation {
    locale: ILocale
}

//#endregion

//#region TableData
export interface ITableData<T> {
    component: string,
    dataSet: ITableList<T>
}

export interface ITableList<T> {
    headers: string[],
    data: ITableRows<T>
}

export interface ITableRows<T> {
    [id: number]: T
}
//#endregion

//#region WAMS Metadata

export interface Field {
    name: string,
    type: FieldType,
    addInfo?: string,
    addField?: string,
    toggleType?: ToggleType
}


//#endregion