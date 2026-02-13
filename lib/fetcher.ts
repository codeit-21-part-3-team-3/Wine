import { ApiPath } from './fetcher.types';

type QueryPrimitive = string | number | boolean | null | undefined;

export type QueryParams = Record<string, QueryPrimitive | QueryPrimitive[]>;

type FetcherOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  query?: QueryParams;
};

const BASE_URL = '/api/proxy';

function buildQueryString(query: QueryParams): string {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, String(v)));
    } else {
      params.append(key, String(value));
    }
  });
  return params.toString();
}

export async function fetcher<TResponse = unknown>(
  path: ApiPath,
  options?: FetcherOptions
): Promise<TResponse> {
  const { body, query, headers, ...rest } = options ?? {};
  const qs = query ? buildQueryString(query) : '';
  const base = `${BASE_URL}${path}`;
  const url = qs ? `${base}${path.includes('?') ? '&' : '?'}${qs}` : base;
  const isFormData = body instanceof FormData;
  const res = await fetch(url, {
    credentials: 'include',
    ...rest,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(headers ?? {}),
    },
    body: body == null ? undefined : isFormData ? body : JSON.stringify(body),
  });

  const data = res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) throw { status: res.status, data };

  return data as TResponse;
}
