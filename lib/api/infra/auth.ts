import { fetcher } from '@/lib/fetcher';
import { OAuthSignInRequest, OAuthSignInResponse } from './auth.types';
import { OAuthProvider } from './oauth.types';

export function signInWithProvider(provider: OAuthProvider, body: OAuthSignInRequest) {
  return fetcher<OAuthSignInResponse>(`/api/proxy/auth/signIn/${provider}`, {
    method: 'POST',
    body,
  });
}
