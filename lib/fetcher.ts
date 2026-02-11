type QueryValue = string | number | boolean;
type Query = Record<string, QueryValue | QueryValue[] | undefined | null>;

type FetcherOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  query?: Query;
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

export async function fetcher<TResponse = unknown>(
  path: `/api/${string}`,
  options?: FetcherOptions
): Promise<TResponse> {
  const { body, query, headers, ...rest } = options ?? {};

  const url = `${path}${buildQueryString(query)}`;

  const isFormData = body instanceof FormData;

  let finalBody: BodyInit | undefined;

  if (body === undefined) {
    finalBody = undefined;
  } else if (isFormData) {
    finalBody = body;
  } else {
    finalBody = JSON.stringify(body);
  }

  const res = await fetch(url, {
    credentials: 'include',
    ...rest,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(headers ?? {}),
    },
    body: finalBody,
  });

  if (!res.ok) throw { status: res.status };

  return res.json().catch(() => null as TResponse);
}
