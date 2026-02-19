export const getCookieOptions = (maxAge: number) => {
  const isProd = process.env.NODE_ENV === 'production';

  const parts = ['Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${maxAge}`];

  if (isProd) parts.push('Secure');

  return parts.join('; ');
};

export const AUTH_COOKIES = {
  accessToken: (token: string) =>
    `accessToken=${encodeURIComponent(token)}; ${getCookieOptions(60 * 30)}`,
  refreshToken: (token: string) =>
    `refreshToken=${encodeURIComponent(token)}; ${getCookieOptions(60 * 60 * 24 * 7)}`,
  clearAccessToken: () => `accessToken=; ${getCookieOptions(0)}`,
  clearRefreshToken: () => `refreshToken=; ${getCookieOptions(0)}`,

  setAuth: (accessToken: string, refreshToken: string) => [
    `accessToken=${encodeURIComponent(accessToken)}; ${getCookieOptions(60 * 30)}`,
    `refreshToken=${encodeURIComponent(refreshToken)}; ${getCookieOptions(60 * 60 * 24 * 7)}`,
  ],

  clearAuth: () => [
    `accessToken=; ${getCookieOptions(0)}`,
    `refreshToken=; ${getCookieOptions(0)}`,
  ],
};

export const parseCookie = (cookieHeader?: string) => {
  const output: Record<string, string> = {};
  if (!cookieHeader) return output;

  cookieHeader.split(';').forEach(part => {
    const [key, ...value] = part.trim().split('=');
    if (!key) return;
    output[key] = decodeURIComponent(value.join('=') ?? '');
  });

  return output;
};
