export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    nickname: string;
    image: null | string;
    updatedAt: string;
    createdAt: string;
  };
}

export interface ClientAuthResponse {
  id: string;
  nickname: string;
  image: string | null;
}
