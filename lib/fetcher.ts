const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

type Primitive = string | number | boolean;

type Query = Record<string, Primitive | Primitive[] | undefined | null>;

type FetcherOptions<TBody> = Omit<RequestInit, 'body'> & {
  body?: TBody;
  query?: Query;
};

type HttpError = {
  status: number;
  data: unknown;
};

function buildQueryString(query?: Query) {
  if (!query) return '';
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value == null) return;

    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, String(v)));
    } else {
      params.append(key, String(value));
    }
  });
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export async function fetcher<TResponse, TBody = unknown>(
  path: string,
  options?: FetcherOptions<TBody>
): Promise<TResponse> {
  const { body, query, headers, ...rest } = options ?? {};

  const url = `${BASE_URL}${path}${buildQueryString(query)}`;

  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...rest,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw { status: res.status, data } satisfies HttpError;
  }

  return data as TResponse;
}
