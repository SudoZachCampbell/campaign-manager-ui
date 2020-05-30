import { IModel } from "../interfaces/Models";

const Get = async function<T>(url: string): Promise<T> {
    let response = await fetch(url);
    return await response.json();
}

export default {
    GET: Get
}

export enum RequestType {
    DELETE = "DELETE",
    GET = "GET",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH"
}