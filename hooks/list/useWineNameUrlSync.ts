import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../useDebouncedValue';

export function useWineNameUrlSync() {
  const router = useRouter();

  const urlName = typeof router.query.name === 'string' ? router.query.name : '';

  const [input, setInput] = useState(urlName);

  useEffect(() => {
    setInput(urlName);
  }, [urlName]);

  const debounced = useDebouncedValue(input, 400);

  useEffect(() => {
    if (!router.isReady) return;

    const normalized = debounced.trim();
    const normalizedUrl = urlName.trim();
    if (normalized === normalizedUrl) return;

    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          name: normalized || undefined,
        },
      },
      undefined,
      { shallow: true }
    );
  }, [debounced, router, urlName]);

  return { name: input, setName: setInput };
}
