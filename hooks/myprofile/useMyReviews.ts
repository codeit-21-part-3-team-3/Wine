import { ApiReview } from '@/lib/api/review/review.types';
import { getMyReviews } from '@/lib/api/user/user';
import { useCallback, useState } from 'react';

export function useMyReviews(limit = 10) {
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (loading) return;
    if (reviews.length > 0) return;

    try {
      setError(null);
      setLoading(true);
      const res = await getMyReviews(limit);
      setReviews(res.list);
    } catch {
      setError('리뷰를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [loading, reviews.length, limit]);

  return { reviews, loading, error, fetch };
}
