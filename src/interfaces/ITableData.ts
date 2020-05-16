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