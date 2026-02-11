import type { NextApiRequest, NextApiResponse } from 'next';

import { AUTH_COOKIES } from '@/lib/auth/cookie';

const ALLOWED_METHODS = ['POST'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!ALLOWED_METHODS.includes(req.method as string)) {
    res.setHeader('Allow', ALLOWED_METHODS.join(', '));
    return res.status(405).end();
  }

  res.setHeader('Set-Cookie', [AUTH_COOKIES.clearAccessToken(), AUTH_COOKIES.clearRefreshToken()]);

  return res.status(200).end();
}
