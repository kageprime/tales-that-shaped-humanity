import { useEffect, useRef } from "react";
import EpisodeReflection from "./EpisodeReflection";
import type { EpisodeData } from "@/lib/episodes";
import type { ScenePalette } from "@/lib/episode-scenes";

interface EpisodeSceneBlockProps {
  segment: EpisodeData["segments"][0];
  scene?: ScenePalette;
  primaryColor: string;
}

export default function EpisodeSceneBlock({ segment, scene, primaryColor }: EpisodeSceneBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = el.querySelectorAll("[data-reveal]");
            els.forEach((c, i) => {
              setTimeout(() => {
                (c as HTMLElement).style.opacity = "1";
                (c as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-16 md:mb-20 relative z-[2]">
      {segment.sound && (
        <p
          data-reveal
          className="font-body italic text-[0.9rem] md:text-[1rem] leading-[1.7] text-center text-parchment/30 mb-8 transition-all duration-700 max-w-[500px] mx-auto"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          [{segment.sound}]
        </p>
      )}

      {segment.hebrew && (
        <div
          data-reveal
          className="my-8 pl-6 md:pl-8 py-5 pr-6 rounded-r-xl border-l-2 transition-all duration-700"
          style={{
            borderLeftColor: primaryColor,
            backgroundColor: `${primaryColor}08`,
            opacity: 0,
            transform: "translateX(-20px)",
          }}
        >
          <p className="font-display text-[1.3rem] md:text-[1.5rem] leading-[1.5]" style={{ color: primaryColor }}>
            {segment.hebrew}
          </p>
          {segment.hebrewTranslation && (
            <p className="font-body text-[0.95rem] text-parchment/50 mt-2 italic">
              &ldquo;{segment.hebrewTranslation}&rdquo;
            </p>
          )}
        </div>
      )}

      {segment.text.map((p, i) => (
        <p
          key={i}
          data-reveal
          className="font-body font-light text-[1.15rem] md:text-[1.25rem] leading-[1.8] text-parchment/85 mb-5 transition-all duration-600"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {p}
        </p>
      ))}

      {scene?.reflection && (
        <div data-reveal style={{ opacity: 0, transform: "translateY(10px)", transitionDuration: "700ms" }}>
          <EpisodeReflection prompt={scene.reflection.prompt} primaryColor={primaryColor} />
        </div>
      )}
    </div>
  );
}
