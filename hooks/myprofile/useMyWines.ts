import { getMyWines } from '@/lib/api/user/user';
import { useCallback, useState } from 'react';
import type { WineListItem } from '@/lib/api/wine/wine.types';

export function useMyWines(limit = 10) {
  const [wines, setWines] = useState<WineListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetch = useCallback(async () => {
    if (loading || hasFetched) return;

    try {
      setError(null);
      setLoading(true);
      const res = await getMyWines(limit);
      setWines(res.list);
      setHasFetched(true);
    } catch {
      setError('와인을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [loading, hasFetched, limit]);

  const removeLocalWine = useCallback((id: number) => {
    setWines(prev => prev.filter(w => w.id !== id));
  }, []);

  const updateLocalWine = useCallback((id: number, patch: Partial<WineListItem>) => {
    setWines(prev => prev.map(w => (w.id === id ? { ...w, ...patch } : w)));
  }, []);

  return { wines, loading, error, fetch, removeLocalWine, updateLocalWine };
}
