import { toast } from '@/components/common/ui/Toast';
import { getWines } from '@/lib/api/wine/wine';
import { mapFilterToQuery, parseWineFilterQuery } from '@/lib/query';
import { Wine } from '@/types/domain/wine';
import { NextRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export function useWineListFetch(
  initialWines: Wine[],
  router: NextRouter,
  initialCursor: number | null
) {
  const [wines, setWines] = useState(initialWines);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
  const [hasNextPage, setHasNextPage] = useState(initialCursor !== null);
  const isFirstRender = useRef(true);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (!router.isReady) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (Object.keys(router.query).length === 0) return;
    }

    const fetchWines = async () => {
      loadingRef.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const parsed = parseWineFilterQuery(router.query);
        const query = mapFilterToQuery(parsed);
        const res = await getWines({ limit: 20, ...query });
        setWines(res.list);
        setCursor(res.nextCursor);
        setHasNextPage(res.nextCursor !== null);
      } catch {
        setError(null);
        toast.error('추가 와인을 불러오지 못했습니다.');
      } finally {
        loadingRef.current = false;
        setIsLoading(false);
      }
    };

    fetchWines();
  }, [router.isReady, router.query]);

  const fetchNextPage = async () => {
    if (!hasNextPage || loadingRef.current) return;

    loadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const parsed = parseWineFilterQuery(router.query);
      const query = mapFilterToQuery(parsed);

      const res = await getWines({
        limit: 20,
        ...(cursor !== null ? { cursor } : {}),
        ...query,
      });
      setWines(prev => [...prev, ...res.list]);
      setCursor(res.nextCursor);
      setHasNextPage(res.nextCursor !== null);
    } catch {
      setError('와인을 불러오지 못했습니다.');
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  };

  const prependWine = (wine: Wine) => {
    setWines(prev => {
      if (prev.some(w => w.id === wine.id)) return prev;
      return [wine, ...prev];
    });
  };

  return { wines, isLoading, error, hasNextPage, fetchNextPage, prependWine };
}
