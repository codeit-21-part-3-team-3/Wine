import type { NextApiRequest, NextApiResponse } from 'next';

import { AuthResponse, ClientAuthResponse } from '@/types/auth/auth';

const BASE_URL = process.env.API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClientAuthResponse | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, nickname, password, passwordConfirmation } = req.body;

    const response = await fetch(`${BASE_URL}/auth/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.details) {
        const firstKey = Object.keys(errorData.details)[0];
        const firstError = errorData.details[firstKey];

        let fieldName = '입력값';
        if (firstKey.includes('password')) fieldName = '비밀번호';
        if (firstKey.includes('email')) fieldName = '이메일';
        if (firstKey.includes('nickname')) fieldName = '닉네임';

        let customMessage = firstError.message;
        if (customMessage.includes('minLength 8')) {
          customMessage = `${fieldName}는 8자 이상이어야 합니다.`;
        } else if (customMessage.includes('already exists')) {
          customMessage = `이미 사용 중인 ${fieldName}입니다.`;
        }

        return res.status(response.status).json({
          message: customMessage,
        });
      }

      // details가 없는 일반적인 에러 메시지 처리
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
