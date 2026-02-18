import { fetcher } from '@/lib/fetcher';
import { UpsertOAuthAppRequest, UpsertOAuthAppResponse } from './oauth.types';

export function upsertOAuthApp(body: UpsertOAuthAppRequest) {
  return fetcher<UpsertOAuthAppResponse>('/oauthApps', {
    method: 'POST',
    body,
  });
}
