export interface ITableData {
    component: string,
    dataSet: { 
        headers: string[], 
        data: [
            { 
                id: number 
            }
        ] 
    }
}

export interface INpcList {
    headers: string[], 
        data: [
            { 
                id: number 
            }
        ] 
}

export interface INpc {
    Id: number,
    Name: string,
    Monster: IMonster,
    Picture: string
}

export interface IMonster {
    Name: string
}