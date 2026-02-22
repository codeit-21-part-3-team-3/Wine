import type { NextApiRequest, NextApiResponse } from 'next';

import { AuthResponse, User } from '@/types/auth/auth';
import { AUTH_COOKIES } from '@/lib/auth/cookie';

const BASE_URL = process.env.API_URL;
const ALLOWED_METHODS = ['POST'];

const ALLOWED_PROVIDERS = ['GOOGLE', 'NAVER', 'KAKAO'] as const;
type Provider = (typeof ALLOWED_PROVIDERS)[number];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ALLOWED_METHODS.join(', '));
    return res.status(405).json({ message: '허용된 메소드가 아닙니다.' });
  }

  const { provider } = req.query;
  const upperProvider = String(provider).toUpperCase();
  const { token, redirectUri, state } = req.body;

  if (!ALLOWED_PROVIDERS.includes(upperProvider as Provider)) {
    return res.status(400).json({
      message: `지원하지 않는 공급자입니다. (${ALLOWED_PROVIDERS.join(', ')})`,
    });
  }

  try {
    let finalToken = token;

    // 1. 구글일 경우에만 인가 코드를 ID 토큰(JWT)으로 교환
    if (upperProvider === 'GOOGLE') {
      const googleRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: token,
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });

      const googleData = await googleRes.json();

      if (!googleRes.ok) {
        console.error(' [Google Error Detail]:', googleData);
        throw new Error(`Google Token Exchange Failed: ${googleData.error}`);
      }

      finalToken = googleData.id_token;
    }

    const targetUrl = `${BASE_URL}/auth/signIn/${upperProvider}`;

    if (upperProvider === 'KAKAO') {
      console.log('--- [KAKAO FINAL CHECK] ---');
      console.log('Target URL:', targetUrl);
      console.log('Payload Token:', token.substring(0, 10) + '...');
      console.log('Payload RedirectURI:', redirectUri); // ← 이 주소가 카카오 설정과 100% 같은지 보세요!
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: finalToken,
        redirectUri,
        state,
      }),
    });

    const data: AuthResponse = await response.json();

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(' [External Server Error Detail]:', errorData);
      return res.status(response.status).json(errorData);
    }

    if (data.accessToken) {
      res.setHeader('Set-Cookie', [
        AUTH_COOKIES.accessToken(data.accessToken),
        AUTH_COOKIES.refreshToken(data.refreshToken),
      ]);
    }

    return res.status(200).json({ ...data.user });
  } catch (error) {
    console.error('Proxy Auth Error:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}
