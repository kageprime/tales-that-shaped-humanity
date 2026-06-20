import { useEffect, useRef } from "react";
import EpisodeReflection from "./EpisodeReflection";
import type { EpisodeData } from "@/lib/episodes";
import type { ScenePalette } from "@/lib/episode-scenes";

interface EpisodeChapterProps {
  segment: EpisodeData["segments"][0];
  scene?: ScenePalette;
  primaryColor: string;
  number: number;
  total: number;
  onVisible?: (soundDescription: string) => void;
}

export default function EpisodeChapter({
  segment,
  scene,
  primaryColor,
  number,
  total,
  onVisible,
}: EpisodeChapterProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            const els = el.querySelectorAll("[data-reveal]");
            els.forEach((c, i) => {
              setTimeout(() => {
                (c as HTMLElement).style.opacity = "1";
                (c as HTMLElement).style.transform = "translateY(0)";
              }, 100 + i * 80);
            });
            if (segment.sound && onVisible) {
              onVisible(segment.sound);
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [segment.sound, onVisible]);

  return (
    <div
      ref={ref}
      className="relative rounded-2xl border border-parchment/[0.06] bg-parchment/[0.03] backdrop-blur-xl p-6 md:p-9 transition-all duration-500"
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Header row: number + sound chip */}
      <div
        data-reveal
        className="flex items-center gap-4 mb-6 transition-all duration-700"
        style={{ opacity: 0, transform: "translateY(16px)" }}
      >
        <span className="font-ui text-[0.75rem] font-medium tracking-[0.12em] uppercase text-parchment/30">
          {String(number).padStart(2, "0")} &mdash; {String(total).padStart(2, "0")}
        </span>
        {segment.sound && (
          <span className="font-ui text-[0.65rem] tracking-[0.08em] text-parchment/25 px-2.5 py-0.5 rounded-full border border-parchment/[0.06]">
            Sound
          </span>
        )}
      </div>

      {/* Sound description */}
      {segment.sound && (
        <p
          data-reveal
          className="font-body text-[0.85rem] md:text-[0.95rem] leading-[1.65] text-parchment/45 mb-6 max-w-[480px] transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(16px)" }}
        >
          &#91;{segment.sound}&#93;
        </p>
      )}

      {/* Hebrew block */}
      {segment.hebrew && (
        <div
          data-reveal
          className="mb-6 px-5 py-4 rounded-xl"
          style={{
            backgroundColor: `${primaryColor}08`,
            opacity: 0,
            transform: "translateY(16px)",
          }}
        >
          <p className="font-display text-[1.2rem] md:text-[1.45rem] leading-[1.5] text-parchment/80">
            {segment.hebrew}
          </p>
          {segment.hebrewTranslation && (
            <p className="font-ui text-[0.85rem] text-parchment/50 mt-2 italic leading-relaxed">
              &ldquo;{segment.hebrewTranslation}&rdquo;
            </p>
          )}
        </div>
      )}

      {/* Body text */}
      {segment.text.map((p, i) => (
        <p
          key={i}
          data-reveal
          className="font-body font-light text-[1rem] md:text-[1.1rem] leading-[1.8] text-parchment/85 mb-4 last:mb-0 transition-all duration-600"
          style={{
            opacity: 0,
            transform: "translateY(16px)",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {p}
        </p>
      ))}

      {/* Reflection */}
      {scene?.reflection && (
        <div
          data-reveal
          className="mt-6 pt-5 border-t border-parchment/[0.06] transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(10px)" }}
        >
          <EpisodeReflection
            prompt={scene.reflection.prompt}
            primaryColor={primaryColor}
          />
        </div>
      )}
    </div>
  );
}
