export interface ITableData {
    component: string,
    dataSet: { 
        headers: string[], 
        data: [
            { 
                Id: number 
            }
        ] 
    }
}

export interface INpcList {
    headers: string[], 
        data: [
            { 
                Id: number 
            }
        ] 
}