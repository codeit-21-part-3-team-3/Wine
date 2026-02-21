import { getMyWines } from '@/lib/api/user/user';
import { WineListItem } from '@/lib/api/wine/wine.types';
import { useCallback, useState } from 'react';

export function useMyWines(limit = 10) {
  const [wines, setWines] = useState<WineListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (loading) return;
    if (wines.length > 0) return;

    try {
      setError(null);
      setLoading(true);
      const res = await getMyWines(limit);
      setWines(res.list);
    } catch {
      setError('와인을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [loading, wines.length, limit]);

  return { wines, loading, error, fetch };
}
