import { ApiUser } from '../user/user.types';

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
