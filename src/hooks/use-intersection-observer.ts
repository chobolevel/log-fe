"use client";

import { useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  enabled?: boolean;
  rootMargin?: string;
}

export function useIntersectionObserver(
  onIntersect: () => void,
  { enabled = true, rootMargin = "200px" }: UseIntersectionObserverOptions = {}
) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  });

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) onIntersectRef.current();
      },
      { rootMargin }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return targetRef;
}
