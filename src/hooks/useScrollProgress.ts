import { useState, useEffect, useRef } from "react";

export function useScrollProgress(segmentCount: number) {
  const [progress, setProgress] = useState(0);
  const [currentSegment, setCurrentSegment] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => {
      const total = content.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(p);

      const seg = Math.min(segmentCount - 1, Math.floor(p * segmentCount));
      setCurrentSegment(seg);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [segmentCount]);

  return { progress, currentSegment, contentRef };
}
