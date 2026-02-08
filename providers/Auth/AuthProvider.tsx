import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import { AuthContextValue, User } from './types';

const AuthContext = createContext<AuthContextValue | null>(null);

const DUMMY_USER: User = {
  id: 99999999999,
  nickname: '더미데이터',
  image: Math.random() > 0.5 ? 'https://loremflickr.com/300/300' : null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = () => {
    setUser(DUMMY_USER);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    isLoading,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};
