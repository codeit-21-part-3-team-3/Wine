export interface User {
  id: number;
  nickname: string;
  image: string | null;
}

export interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
