import { ApiUser } from '../user/user.types';

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface OAuthSignInRequest {
  state: string;
  redirectUri: string;
  token: string;
}

type OAuthUser = ApiUser & {
  email: string;
};

export interface OAuthSignInResponse {
  accessToken: string;
  refreshToken: string;
  user: OAuthUser;
}
