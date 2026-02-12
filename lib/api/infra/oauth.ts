import { fetcher } from '@/lib/fetcher';
import { UpsertOAuthAppRequest, UpsertOAuthAppResponse } from './oauth.types';

export function upsertOAuthApp(body: UpsertOAuthAppRequest) {
  return fetcher<UpsertOAuthAppResponse>('/api/proxy/oauthApps', {
    method: 'POST',
    body,
  });
}
