import { ApiReview } from '@/lib/api/review/review.types';
import { getMyReviews } from '@/lib/api/user/user';
import { useCallback, useState } from 'react';

export function useMyReviews(limit = 10) {
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetch = useCallback(async () => {
    if (loading) return;
    if (hasFetched) return;

    try {
      setError(null);
      setLoading(true);
      const res = await getMyReviews(limit);
      setReviews(res.list);
      setHasFetched(true);
    } catch {
      setError('리뷰를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [loading, hasFetched, limit]);

  const removeLocalReview = useCallback((id: number) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  }, []);

  const updateLocalReview = useCallback((id: number, updated: ApiReview) => {
    setReviews(prev => prev.map(r => (r.id === id ? updated : r)));
  }, []);

  const patchLocalReview = useCallback((id: number, patch: Partial<ApiReview>) => {
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, ...patch } : r)));
  }, []);

  return { reviews, loading, error, fetch, removeLocalReview, updateLocalReview, patchLocalReview };
}
