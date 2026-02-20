import { fetcher } from '@/lib/fetcher';
import { SignInCredentials, SignUpCredentials, User } from '@/types/auth/auth';

export function signIn(body: SignInCredentials) {
  return fetcher<User>('/auth/signin', {
    method: 'POST',
    body,
  });
}

export function signUp(body: SignUpCredentials) {
  return fetcher<User>('/auth/signup', {
    method: 'POST',
    body,
  });
}

export function signOut() {
  return fetcher('/auth/logout', {
    method: 'POST',
  });
}
