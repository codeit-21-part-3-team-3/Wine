import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.API_URL;
const ALLOWED_METHODS = ['GET', 'POST', 'PATCH', 'DELETE'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!ALLOWED_METHODS.includes(req.method as string)) {
    res.setHeader('Allow', ALLOWED_METHODS.join(', '));
    return res.status(405).json({ message: '허용된 메소드가 아닙니다.' });
  }

  try {
    const { path, ...query } = req.query;
    const pathString = Array.isArray(path) ? path.join('/') : path;
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => v != null && params.append(key, v));
      } else if (value != null) {
        params.append(key, value);
      }
    });

    const qs = params.toString();
    const url = `${BASE_URL}/${pathString}${qs ? `?${qs}` : ''}`;

    const { accessToken } = req.cookies;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const options = {
      method: req.method,
      headers,
      body:
        req.method === 'POST' || req.method === 'PATCH'
          ? JSON.stringify(req.body ?? {})
          : undefined,
    };

    const response = await fetch(url, options);

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
  }
}
