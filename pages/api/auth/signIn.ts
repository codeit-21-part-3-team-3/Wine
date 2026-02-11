import type { NextApiRequest, NextApiResponse } from 'next';

import { AuthResponse, ClientAuthResponse } from '@/types/auth/auth';
import { setCookie } from '@/lib/auth/cookie';

const BASE_URL = process.env.API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClientAuthResponse | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, password }: SignInRequest = req.body;

    const response = await fetch(`${BASE_URL}/auth/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 400) {
        return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
      }

      return res.status(response.status).json({ message: '서버 오류가 발생했습니다.' });
    }

    const data: AuthResponse = await response.json();

    res.setHeader('Set-Cookie', [
      setCookie.accessToken(data.accessToken),
      setCookie.refreshToken(data.refreshToken),
    ]);

    return res.status(201).json({
      id: data.user.id,
      nickname: data.user.nickname,
      image: data.user.image,
    });
  } catch (error) {
    console.error('Error signing in:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}
