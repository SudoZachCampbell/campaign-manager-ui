export const get = async function<T>(url: string): Promise<T> {
    let response = await fetch(url);
    const returnTyped: T = await response.json();
    return returnTyped;
}

export default {
    get: get
}