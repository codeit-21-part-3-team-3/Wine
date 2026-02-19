import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  onIntersect: () => void | Promise<void>;
  hasNextPage?: boolean;
  loading?: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

export default function useInfiniteScroll<T extends Element = HTMLElement>({
  onIntersect,
  hasNextPage = true,
  loading = false,
  root = null,
  rootMargin = '200px',
  threshold = 0,
}: UseInfiniteScrollOptions) {
  const targetRef = useRef<T | null>(null);
  const callbackRef = useRef(onIntersect);
  const isFetchingRef = useRef(false);

  const lastTriggerRef = useRef(0);
  const TRIGGER_DELAY = 200;

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (isFetchingRef.current) return;

        const now = Date.now();
        if (now - lastTriggerRef.current < TRIGGER_DELAY) return;
        lastTriggerRef.current = now;

        isFetchingRef.current = true;
        callbackRef.current();
      },
      { root, rootMargin, threshold }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, root, rootMargin, threshold]);

  useEffect(() => {
    if (!loading) isFetchingRef.current = false;
  }, [loading]);

  return targetRef;
}
