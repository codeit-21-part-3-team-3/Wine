import { SignInCredentials, SignUpCredentials, User } from '@/types/auth/auth';

export interface AuthContextValue {
  isLoading: boolean;
  user: User | null;
  login: (credentials: SignInCredentials) => Promise<void>;
  signup: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (newUser: User) => void;
}
