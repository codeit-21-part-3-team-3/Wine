import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { AuthContextValue } from './types';
import { SignInCredentials, SignUpCredentials, User } from '@/types/auth/auth';
import { getMe } from '@/lib/api/user/user';
import { signIn, signUp, signOut } from '@/lib/api/auth/auth';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error('인증 확인 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = useCallback(async (credentials: SignInCredentials): Promise<void> => {
    try {
      const data = await signIn(credentials);

      setUser(data);
    } catch (error) {
      throw error;
    }
  }, []);

  const signup = useCallback(async (credentials: SignUpCredentials): Promise<void> => {
    try {
      const data = await signUp(credentials);
      setUser(data);
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  }, [router]);

  const updateUser = useCallback((newUser: User) => {
    setUser(newUser);
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      user,
      login,
      signup,
      logout,
      updateUser,
    }),
    [isLoading, user, login, signup, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};
