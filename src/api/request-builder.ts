export const get = async function(url: string): Promise<object> {
    let response = await fetch(url);
    return await response.json();
}

export default {
    get: get
}