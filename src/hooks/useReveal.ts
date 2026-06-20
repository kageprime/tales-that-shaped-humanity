import { useEffect, useRef, type RefObject } from "react";

interface UseRevealOptions {
  /** IntersectionObserver threshold. Default 0.15 */
  threshold?: number;
  /** Stagger delay (ms) between revealed children. Default 80 */
  stagger?: number;
  /** Attribute that marks revealable children. Default "data-reveal" */
  attribute?: string;
  /** Optional initial delay (ms) before the first child starts animating. Default 0 */
  initialDelay?: number;
  /** Fired once when the container scrolls into view (before children animate). */
  onReveal?: () => void;
}

/**
 * Attach the returned ref to a container. When the container scrolls into view,
 * every child carrying `attribute` (default `[data-reveal]`) is faded in and
 * translated up, staggered by `stagger` ms.
 *
 * Children must start at `opacity: 0` via inline style — the hook animates
 * them to visible state exactly once.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  stagger = 80,
  attribute = "data-reveal",
  initialDelay = 0,
  onReveal,
}: UseRevealOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onReveal?.();
            const targets = el.querySelectorAll(`[${attribute}]`);
            targets.forEach((child, i) => {
              setTimeout(() => {
                (child as HTMLElement).style.opacity = "1";
                (child as HTMLElement).style.transform = "translateY(0)";
              }, initialDelay + i * stagger);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, stagger, attribute, initialDelay, onReveal]);

  return ref;
}
