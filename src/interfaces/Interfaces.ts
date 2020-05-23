export interface IModel {
    Id: number,
    Name: string
}

//#region Creatures
export interface ICreature extends IModel {
    Alignment: number,
    Picture?: string
}

export interface INpc {
    Id: number,
    Name: string
    Picture?: string,
    Monster?: IMonster, 
    Locale?: ILocale, 
    Building?: IBuilding 
}

export interface IMonster extends ICreature {
    Pp: number
}

//#endregion

//#region Locations

export interface ILocale {
    Name: string
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