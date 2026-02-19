import { AUTH_COOKIES, mergeSetCookie, HeaderHandleable } from './cookie';
import { refreshAccessToken } from './refresh';

type RefreshAuthContext = {
  refreshToken: string | null | undefined;
  res: HeaderHandleable;
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
