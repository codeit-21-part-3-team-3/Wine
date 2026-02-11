import type { NextApiRequest, NextApiResponse } from 'next';

import { ClientAuthResponse } from '@/types/auth/auth';

const BASE_URL = process.env.API_URL;
const ALLOWED_METHODS = ['GET'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClientAuthResponse | { message: string }>
) {
  if (!ALLOWED_METHODS.includes(req.method as string)) {
    res.setHeader('Allow', ALLOWED_METHODS.join(', '));
    return res.status(405).end();
  }

  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: '인증 토큰이 없습니다.' });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const options = {
      method: req.method,
      headers,
    };

    const response = await fetch(`${BASE_URL}/users/me`, options);

    if (!response.ok) {
      return res.status(response.status).json({ message: '서버 오류가 발생했습니다.' });
    }

    const data = await response.json();

    return res.status(200).json({
      id: data.id,
      nickname: data.nickname,
      image: data.image,
    });
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}
