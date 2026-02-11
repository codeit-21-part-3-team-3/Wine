import type { NextApiRequest, NextApiResponse } from 'next';

import { AuthResponse, SignUpCredentials, ClientAuthResponse } from '@/types/auth/auth';

const BASE_URL = process.env.API_URL;
const ALLOWED_METHODS = ['POST'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClientAuthResponse | { message: string }>
) {
  if (!ALLOWED_METHODS.includes(req.method as string)) {
    res.setHeader('Allow', ALLOWED_METHODS.join(', '));
    return res.status(405).json({ message: '허용된 메소드가 아닙니다.' });
  }

  try {
    const { email, nickname, password, passwordConfirmation }: SignUpCredentials = req.body;

    const response = await fetch(`${BASE_URL}/auth/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return res.status(response.status).json({
        message: errorData.message || '서버 오류가 발생했습니다.',
      });
    }

    const data: AuthResponse = await response.json();

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
