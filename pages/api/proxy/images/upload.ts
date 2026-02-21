import type { NextApiRequest, NextApiResponse } from 'next';
import { refreshAuthSession } from '@/lib/auth/refreshAuthSession';

export const config = {
  api: {
    bodyParser: false,
  },
};

const BASE_URL = process.env.API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '허용된 메소드가 아닙니다.' });
  }

  try {
    const { accessToken, refreshToken } = req.cookies;

    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const rawBody = Buffer.concat(chunks);

    const forwardUpload = (token?: string) => {
      const headers: Record<string, string> = {};

      if (req.headers['content-type']) {
        headers['Content-Type'] = req.headers['content-type'];
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      return fetch(`${BASE_URL}/images/upload`, {
        method: 'POST',
        headers,
        body: rawBody,
      });
    };

    const response = await forwardUpload(accessToken);

    if (response.status === 401 && refreshToken) {
      const newAccessToken = await refreshAuthSession({ refreshToken, res });

      if (newAccessToken) {
        const retryResponse = await forwardUpload(newAccessToken);
        const retryData = await retryResponse.json();
        return res.status(retryResponse.status).json(retryData);
      }
    }

    const data = await response.json().catch(() => null);
    return res.status(response.status).json(data ?? { message: '백엔드 응답 파싱 실패' });
  } catch (error) {
    console.error('[Proxy Error]', error);
    return res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
}
