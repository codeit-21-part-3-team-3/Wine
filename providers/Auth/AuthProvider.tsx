import { createContext, useContext, useState } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => {
    setIsLoggedIn(true);
    setUser(DUMMY_USER);

    console.log('로그인 되었습니다.');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);

    console.log('로그아웃 되었습니다.');
  };

  const value = {
    isLoggedIn,
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
