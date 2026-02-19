import { mapFilterToUrlQuery, parseWineFilterQuery } from '@/lib/query';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export function useWineFilterUrlSync() {
  const router = useRouter();

  const appliedFilter = useMemo(() => parseWineFilterQuery(router.query), [router.query]);

  const [draftFilter, setDraftFilter] = useState(appliedFilter);

  useEffect(() => {
    setDraftFilter(appliedFilter);
  }, [appliedFilter]);

  const apply = () => {
    router.push({ pathname: router.pathname, query: mapFilterToUrlQuery(draftFilter) }, undefined, {
      shallow: true,
    });
  };

  const reset = () => {
    router.push({ pathname: router.pathname, query: {} }, undefined, { shallow: true });
  };

  return {
    filter: draftFilter,
    setFilter: setDraftFilter,
    apply,
    reset,
    router,
  };
}
