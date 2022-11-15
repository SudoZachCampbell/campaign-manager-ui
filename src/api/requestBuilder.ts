export enum RequestType {
  GET = 'GET',
  PATCH = 'PATCH',
}

export interface RequestProps {
  url: string;
  queryParams?: QueryParams;
  body?: string;
}

export interface QueryParams {
  include?: string[];
  expand?: string[];
}

const Get = async function <T>({
  url,
  queryParams,
  body,
}: RequestProps): Promise<T> {
  let response = await fetch(buildUrl(url, queryParams));
  if (!response.ok) {
    const error = await response.clone().text();
    console.error('GET Request Error: ', error);
  }
  return await response.json();
};

const Patch = async function <T>({
  url,
  queryParams,
  body,
}: RequestProps): Promise<T> {
  let response = await fetch(buildUrl(url, queryParams), {
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
    method: RequestType.PATCH,
  });
  if (!response.ok) {
    const error = await response.clone().text();
    console.error('PATCH Request Error: ', error);
  }
  return await response.json();
};

const buildUrl = (url: string, queryParams?: QueryParams) => {
  const queryString = Object.entries(queryParams ?? {}).reduce<string>(
    (acc, [key, value]) => {
      acc += `${key}=${Array.isArray(value) ? value.join(',') : value}`;
      return acc;
    },
    '?',
  );
  return `${url}${Object.keys(queryParams ?? {}).length ? queryString : ''}`;
};

const apiTypes: Record<RequestType, <T>(props: RequestProps) => Promise<T>> = {
  GET: Get,
  PATCH: Patch,
};

export default apiTypes;
