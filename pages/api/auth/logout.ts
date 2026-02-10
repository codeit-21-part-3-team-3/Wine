import type { NextApiRequest, NextApiResponse } from 'next';

import { setCookie } from '@/lib/auth/cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  res.setHeader('Set-Cookie', [setCookie.clearAccessToken(), setCookie.clearRefreshToken()]);

  return res.status(200).end();
}
