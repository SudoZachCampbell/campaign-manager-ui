export interface Patch {
    op: string,
    path: string,
    value?: object | string | number| any[]
}