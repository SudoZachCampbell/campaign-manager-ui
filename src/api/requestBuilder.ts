export enum RequestType {
    DELETE = "DELETE",
    GET = "GET",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH"
}

const Get = async function <T>(url: string): Promise<T> {
    let response = await fetch(url);
    if (!response.ok) {
        const error = await response.clone().text();
        console.error("GET Request Error: ", error)
    }
    return await response.json();
}

const Patch = async function <T>(url: string, body: string): Promise<T> {
    console.log(`PATCH Request to ${url}: `, body)
    let response = await fetch(url, {
        body: body,
        headers: {
            'Content-Type': 'application/json'
        },
        method: RequestType.PATCH
    })
    if (!response.ok) {
        const error = await response.clone().text();
        console.error("PATCH Request Error: ", error)
    }
    return await response.json();
}

export default {
    GET: Get,
    PATCH: Patch
}