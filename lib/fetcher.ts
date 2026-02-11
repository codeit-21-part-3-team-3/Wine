type FetcherOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  query?: Record<string, unknown>;
};

export async function fetcher<TResponse = unknown>(
  path: `/api/${string}`,
  options?: FetcherOptions
): Promise<TResponse> {
  const { body, query, headers, ...rest } = options ?? {};

  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v != null) params.append(k, String(v));
    });
  }

  const qs = params.toString();
  const url = `${path}${qs ? `?${qs}` : ''}`;

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

  const data = await res.json().catch(() => null);

  if (!res.ok) throw { status: res.status, data };

  return data as TResponse;
}
