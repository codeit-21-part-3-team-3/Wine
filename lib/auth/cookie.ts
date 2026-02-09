export const getCookieOptions = (maxAge: number) => {
  const isProd = process.env.NODE_ENV === 'production';
  return `Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; ${isProd ? '; Secure' : ''}`;
};

export const setCookie = {
  accessToken: (token: string) => `accessToken=${token}; ${getCookieOptions(60 * 60 * 24 * 7)}`,
  refreshToken: (token: string) => `refreshToken=${token}; ${getCookieOptions(60 * 60 * 24 * 7)}`,
  clearAccessToken: () => `accessToken=; Path=/; Max-Age=0`,
  clearRefreshToken: () => `refreshToken=; Path=/; Max-Age=0`,
};
