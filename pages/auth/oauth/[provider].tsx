import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/providers/Auth/AuthProvider';

export default function OAuthCallback() {
  const router = useRouter();
  const { provider, code } = router.query;
  const { updateUser } = useAuth();

  useEffect(() => {
    if (!code || !provider) return;

    console.log('🚀 카카오 로그인 요청 시작! 코드:', code);

    const completeLogin = async () => {
      try {
        const origin = window.location.origin;
        const redirectPath = process.env.NEXT_PUBLIC_REDIRECT_PATH;

        const currentRedirectUri = `${origin}${redirectPath}/${provider}`;

        const response = await fetch(`/api/proxy/auth/signin/${provider}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: code,
            redirectUri: currentRedirectUri,
            state: 'string',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          updateUser(data);

          const referrer = document.referrer;
          const host = window.location.host;

          if (referrer && referrer.includes(host) && !referrer.includes('/auth/')) {
            router.push(referrer);
          } else {
            router.push('/');
          }
        } else {
          const errorData = await response.json();
          console.error('로그인 실패:', errorData.message);
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('인증 요청 중 에러 발생:', error);
      }
    };

    completeLogin();
  }, [code, provider, router, updateUser]);

  return <div>인증 정보를 처리하고 있습니다...</div>;
}
