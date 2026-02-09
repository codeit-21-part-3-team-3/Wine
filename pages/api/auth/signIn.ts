import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;

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

    const data = await response.json();

    const isProd = process.env.NODE_ENV === 'production';
    const cookieBase = `Path=/; HttpOnly; SameSite=Lax${isProd ? '; Secure' : ''}`;

    res.setHeader('Set-Cookie', [
      `accessToken=${data.accessToken}; Max-Age=${30 * 60}; ${cookieBase}`,
      `refreshToken=${data.refreshToken}; Max-Age=${7 * 24 * 60 * 60}; ${cookieBase}`,
    ]);

    return res.status(200).json({
      id: data.user.id,
      nickname: data.user.nickname,
      image: data.user.image,
    });
  } catch (error) {
    console.error('Error signing in:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}
