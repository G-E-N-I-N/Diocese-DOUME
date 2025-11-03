"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook personnalisé pour déclencher une animation quand un élément devient visible dans le viewport.
 * Retourne une ref à attacher à l'élément et un booléen `isVisible`.
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isVisible };
}
