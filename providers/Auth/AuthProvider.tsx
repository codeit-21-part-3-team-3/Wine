import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

import { AuthContextValue, User, LoginResponse } from './types';
import { SignInCredentials } from '@/types/auth/auth';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await fetch('/api/proxy/users/me');

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('인증 확인 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = useCallback(async (credentials: SignInCredentials): Promise<LoginResponse> => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        return { success: true, user: data };
      }
      return { success: false, error: data.message };
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      return { success: false, error: '네트워크 오류가 발생했습니다.' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      user,
      login,
      logout,
    }),
    [isLoading, user, login, logout]
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
