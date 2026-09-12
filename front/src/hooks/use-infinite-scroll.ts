"use client";

import { useEffect, useRef } from "react";

export function useInfiniteScroll(options: {
  enabled: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}) {
  const { enabled, isLoading } = options;
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const onLoadMoreRef = useRef(options.onLoadMore);
  const isInViewRef = useRef(false);

  useEffect(() => {
    onLoadMoreRef.current = options.onLoadMore;
  }, [options.onLoadMore]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !enabled || isLoading) return;

    let baseline = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const inView = entry.isIntersecting;

        if (baseline) {
          baseline = false;
          isInViewRef.current = inView;
          return;
        }

        if (inView && !isInViewRef.current) {
          onLoadMoreRef.current();
        }
        isInViewRef.current = inView;
      },
      { rootMargin: "100px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, isLoading]);

  return sentinelRef;
}