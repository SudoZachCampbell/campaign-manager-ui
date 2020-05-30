import { GetApp } from "@material-ui/icons";

const monster = async function (): Promise<object> {

}



export const get = async function (url: string): Promise<object> {
    let response = await fetch(url);
    return await response.json();
}

export default {
    get: get
}


