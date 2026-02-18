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
};
