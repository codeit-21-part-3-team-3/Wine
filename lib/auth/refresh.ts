const BASE_URL = process.env.API_URL;

type RefreshTokenResponse = {
  accessToken?: unknown;
};

export const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      console.error('리프래시 토큰 업데이트 중 오류 발생:', res);
      return null;
    }

    let data: RefreshTokenResponse | null = null;

    try {
      data = (await res.json()) as RefreshTokenResponse;
    } catch {
      console.error('리프래시 토큰 업데이트 중 오류 발생:', res);
      return null;
    }

    const accessToken = data?.accessToken;

    return typeof accessToken === 'string' && accessToken.length > 0 ? accessToken : null;
  } catch (error) {
    console.error('리프래시 토큰 업데이트 중 오류 발생:', error);
    return null;
  }
};
