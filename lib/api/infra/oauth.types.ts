export type OAuthProvider = 'GOOGLE' | 'KAKAO' | 'NAVER';

export interface OAuthApp {
  id: number;
  teamId: string;
  provider: OAuthProvider;
  appKey: string;
  appSecret?: string;
  createdAt: string;
  updatedAt: string;
}

export type UpsertOAuthAppRequest = Pick<OAuthApp, 'provider' | 'appKey' | 'appSecret'>;

export type UpsertOAuthAppResponse = OAuthApp;
