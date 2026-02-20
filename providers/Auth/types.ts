import { SignInCredentials } from '@/types/auth/auth';

export interface User {
  id: number;
  nickname: string;
  image: string | null;
}

export type LoginResponse = { success: true } | { success: false; error: string };

export interface AuthContextValue {
  isLoading: boolean;
  user: User | null;
  login: (credentials: SignInCredentials) => Promise<LoginResponse>;
  logout: () => Promise<void>;
}
