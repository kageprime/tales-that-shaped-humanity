import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "teardrop" | "shrink" | "load" | "expand" | "reveal";

interface SceneTransitionProps {
  active: boolean;
  onComplete?: () => void;
}

const TEARDROP_FULL = "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)";
const TEARDROP_POINT = "polygon(50% 0%, 50% 0%, 50% 50%, 50% 100%, 50% 100%, 50% 50%)";
const RECTANGLE = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

export default function SceneTransition({ active, onComplete }: SceneTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const transitioningRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    if (!active) {
      el.style.display = "none";
      el.style.clipPath = RECTANGLE;
      el.style.opacity = "1";
      transitioningRef.current = false;
      return;
    }

    if (transitioningRef.current) return;
    transitioningRef.current = true;

    el.style.display = "block";
    el.style.opacity = "1";

    el.style.transition = "clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    el.style.clipPath = TEARDROP_FULL;
    setPhase("teardrop");

    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(() => {
        if (!mountedRef.current || !overlayRef.current) {
          timeouts.forEach(clearTimeout);
          return;
        }
        fn();
      }, delay);
      timeouts.push(id);
      return id;
    };

    schedule(() => {
      if (!overlayRef.current) return;
      const el2 = overlayRef.current;
      el2.style.transition = "clip-path 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      el2.style.clipPath = TEARDROP_POINT;
      setPhase("shrink");

      schedule(() => {
        if (!overlayRef.current) return;
        const el3 = overlayRef.current;
        el3.style.transition = "opacity 0.15s ease";
        el3.style.opacity = "0";
        setPhase("load");

        schedule(() => {
          if (!overlayRef.current) return;
          const el4 = overlayRef.current;
          el4.style.transition = "none";
          el4.style.clipPath = TEARDROP_POINT;
          el4.style.opacity = "1";
          setPhase("expand");

          void el4.offsetHeight;

          el4.style.transition = "clip-path 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
          el4.style.clipPath = TEARDROP_FULL;
          setPhase("expand");

          schedule(() => {
            if (!overlayRef.current) return;
            const el5 = overlayRef.current;
            el5.style.transition = "clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
            el5.style.clipPath = RECTANGLE;
            setPhase("reveal");

            schedule(() => {
              if (!overlayRef.current) return;
              const el6 = overlayRef.current;
              el6.style.display = "none";
              setPhase("idle");
              transitioningRef.current = false;
              onComplete?.();
            }, 450);
          }, 350);
        }, 200);
      }, 350);
    }, 450);

    return () => {
      timeouts.forEach(clearTimeout);
      transitioningRef.current = false;
    };
  }, [active, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        display: "none",
        clipPath: RECTANGLE,
        background: "#0a0a0a",
      }}
    >
      {phase === "load" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-parchment/30 border-t-amber animate-spin" />
        </div>
      )}
    </div>
  );
}
