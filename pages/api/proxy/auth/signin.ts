import type { NextApiRequest, NextApiResponse } from 'next';

import { AuthResponse, SignInCredentials, User } from '@/types/auth/auth';
import { AUTH_COOKIES } from '@/lib/auth/cookie';

const BASE_URL = process.env.API_URL;
const ALLOWED_METHODS = ['POST'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  if (!ALLOWED_METHODS.includes(req.method as string)) {
    res.setHeader('Allow', ALLOWED_METHODS.join(', '));
    return res.status(405).json({ message: '허용된 메소드가 아닙니다.' });
  }

  try {
    const { email, password }: SignInCredentials = req.body;

    const response = await fetch(`${BASE_URL}/auth/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
      }

      const errorData = await response.json();

      return res.status(response.status).json(errorData);
    }

    const data: AuthResponse = await response.json();

    res.setHeader('Set-Cookie', [
      AUTH_COOKIES.accessToken(data.accessToken),
      AUTH_COOKIES.refreshToken(data.refreshToken),
    ]);

    return res.status(200).json({
      id: data.user.id,
      nickname: data.user.nickname,
      image: data.user.image,
      createdAt: data.user.createdAt,
      updatedAt: data.user.updatedAt,
    });
  } catch (error) {
    console.error('Error signing in:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}
