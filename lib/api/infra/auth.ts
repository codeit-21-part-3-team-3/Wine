import { fetcher } from '@/lib/fetcher';
import {
  OAuthSignInRequest,
  OAuthSignInResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './auth.types';
import { OAuthProvider } from './oauth.types';

export function refreshToken(body: RefreshTokenRequest) {
  return fetcher<RefreshTokenResponse>('/api/proxy/auth/refresh-token', {
    method: 'POST',
    body,
  });
}

export function signInWithProvider(provider: OAuthProvider, body: OAuthSignInRequest) {
  return fetcher<OAuthSignInResponse>(`/api/proxy/auth/signIn/${provider}`, {
    method: 'POST',
    body,
  });
}
