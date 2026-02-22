export const getAuthUrl = (provider: 'google' | 'kakao' | 'naver') => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const redirectPath = process.env.NEXT_PUBLIC_REDIRECT_PATH;

  const REDIRECT_URI = `${origin}${redirectPath}/${provider}`;

  const configs = {
    google: {
      rootUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    },
    kakao: {
      rootUrl: 'https://kauth.kakao.com/oauth/authorize',
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      scope: '',
    },
    naver: {
      rootUrl: 'https://nid.naver.com/oauth2.0/authorize',
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      scope: '',
    },
  };

  const { rootUrl, clientId, scope } = configs[provider];

  const options = {
    redirect_uri: REDIRECT_URI,
    client_id: clientId!,
    response_type: 'code',
    ...(provider === 'google' && { access_type: 'offline', prompt: 'consent' }),
    ...(scope && { scope }),
    state: 'string',
  };

  const queryString = new URLSearchParams(options).toString();

  return `${rootUrl}?${queryString}`;
};
