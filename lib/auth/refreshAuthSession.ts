import type { NextApiResponse } from 'next';
import type { ServerResponse } from 'http';

import { AUTH_COOKIES } from './cookie';
import { refreshAccessToken } from './refresh';

type HeaderHandleable = Pick<NextApiResponse | ServerResponse, 'setHeader' | 'getHeader'>;

type RefreshAuthContext = {
  refreshToken: string | null | undefined;
  res: HeaderHandleable;
};

const mergeSetCookie = (res: HeaderHandleable, newValue: string | string[]) => {
  const prev = res.getHeader('Set-Cookie');
  const prevArray = prev ? (Array.isArray(prev) ? prev.map(String) : [String(prev)]) : [];
  const nextArray = Array.isArray(newValue) ? newValue : [newValue];

  res.setHeader('Set-Cookie', [...prevArray, ...nextArray]);
};

export const refreshAuthSession = async ({
  refreshToken,
  res,
}: RefreshAuthContext): Promise<string | null> => {
  if (!refreshToken) {
    mergeSetCookie(res, AUTH_COOKIES.clearAuth());
    return null;
  }

  const newAccessToken = await refreshAccessToken(refreshToken);

  if (!newAccessToken) {
    mergeSetCookie(res, AUTH_COOKIES.clearAuth());
    return null;
  }

  mergeSetCookie(res, AUTH_COOKIES.accessToken(newAccessToken));
  return newAccessToken;
};
