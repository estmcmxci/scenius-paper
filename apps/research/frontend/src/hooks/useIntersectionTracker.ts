import { useEffect, useRef } from 'react';

export function useIntersectionTracker(
  onSectionChange: (slug: string) => void,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slug = (entry.target as HTMLElement).dataset.section;
            if (slug) onSectionChange(slug);
          }
        }
      },
      {
        root: container,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    const sections = container.querySelectorAll('[data-section]');
    sections.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [onSectionChange, containerRef]);

  return observerRef;
}
