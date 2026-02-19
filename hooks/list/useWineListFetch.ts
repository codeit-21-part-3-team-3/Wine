import { getWines } from '@/lib/api/wine/wine';
import { mapFilterToQuery, parseWineFilterQuery } from '@/lib/query';
import { Wine } from '@/types/domain/wine';
import { NextRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export function useWineListFetch(initialWines: Wine[], router: NextRouter) {
  const [wines, setWines] = useState(initialWines);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!router.isReady) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (Object.keys(router.query).length === 0) return;
    }

    const fetchWines = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const parsed = parseWineFilterQuery(router.query);
        const query = mapFilterToQuery(parsed);
        const res = await getWines({ limit: 20, ...query });
        setWines(res.list);
      } catch {
        setError('와인을 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWines();
  }, [router.isReady, router.query]);

  return { wines, isLoading, error };
}
