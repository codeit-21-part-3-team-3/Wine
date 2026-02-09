export interface User {
  id: number;
  nickname: string;
  image: string | null;
}

export interface AuthContextValue {
  isLoading: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}
