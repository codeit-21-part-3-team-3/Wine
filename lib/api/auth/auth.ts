import { fetcher } from '@/lib/fetcher';
import { AuthResponse, SignInCredentials, SignUpCredentials } from '@/types/auth/auth';

export function signIn(body: SignInCredentials) {
  return fetcher<AuthResponse>('/auth/signIn', {
    method: 'POST',
    body,
  });
}

export function signUp(body: SignUpCredentials) {
  return fetcher<AuthResponse>('/auth/signUp', {
    method: 'POST',
    body,
  });
}

export function signOut() {
  return fetcher('/auth/logout', {
    method: 'POST',
  });
}
