export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface User {
  id: number;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type ClientAuthResponse = Pick<User, 'id' | 'nickname' | 'image'>;
