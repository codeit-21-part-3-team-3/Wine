import { Wine } from '@/types/domain/wine';
import { useMemo, useState } from 'react';

export function useWineKeywordFilter(wines: Wine[]) {
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(() => {
    const k = keyword.toLowerCase();
    return wines.filter(w => (w.name ?? '').toLowerCase().includes(k));
  }, [keyword, wines]);

  return { keyword, setKeyword, filtered };
}
