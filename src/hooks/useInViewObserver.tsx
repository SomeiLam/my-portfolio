import { useEffect, useState, useRef } from 'react';

export const useInViewObserver = (threshold = 0.3) => {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      setInView(true); // Skip observer on mobile
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        threshold,
        rootMargin: '0px 0px -20% 0px',
      },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};
