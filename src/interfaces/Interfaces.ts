export interface IModel {
    Name: string
}

//#region Creatures
export interface ICreature extends IModel {

}

export interface INpc extends ICreature{
    Id: number,
    Picture: string,
    Monster: IMonster, 
    Locale: ILocale, 
    Building: IBuilding 
}

export interface IMonster extends ICreature {
    Name: string
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