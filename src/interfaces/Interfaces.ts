export interface IModel {
    id: number,
    name: string
}

//#region Creatures
export interface ICreature extends IModel {
    alignment: number,
    hp: number,
    picture?: string
}

export interface INpc {
    id: number,
    name: string
    picture?: string,
    monster?: IMonster, 
    locale?: ILocale, 
    building?: IBuilding 
}

export interface IMonster extends ICreature {
    pp: number
}

//#endregion

//#region Locations

export interface ILocale {
    name: string
}

export interface IBuilding {

}

//#endregion

//#region TableData
export interface ITableData {
    component: string,
    dataSet: ITableList
}

export interface ITableList {
    headers: string[], 
        data: [
            { 
                id: number 
            }
        ] 
}
//#endregion