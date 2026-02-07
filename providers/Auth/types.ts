export interface User {
  id: number;
  nickname: string;
  image: string | null;
}

export interface AuthContextValue {
  isLoggedIn: boolean | null;
  user: User | null;
  login: () => void;
  logout: () => void;
}
