import { useEffect, useRef, useState } from "react";
import LiveWallpaper from "./LiveWallpaper";
import ForestVideoBackground from "./ForestVideoBackground";
import EpisodeReflection from "./EpisodeReflection";
import type { EpisodeData } from "@/lib/episodes";
import type { ScenePalette } from "@/lib/episode-scenes";
import type { WallpaperType } from "./LiveWallpaper";

interface SegmentHeroProps {
  segment: EpisodeData["segments"][0];
  scene?: ScenePalette;
  wallpaperType: WallpaperType;
  primaryColor: string;
  index: number;
  total: number;
  onActive?: () => void;
}

export default function SegmentHero({
  segment,
  scene,
  wallpaperType,
  primaryColor,
  index,
  total,
  onActive,
}: SegmentHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActive?.();
          const textEl = textRef.current;
          if (textEl) {
            const children = textEl.querySelectorAll("[data-reveal]");
            children.forEach((c, i) => {
              setTimeout(() => {
                (c as HTMLElement).style.opacity = "1";
                (c as HTMLElement).style.transform = "translateY(0)";
              }, 200 + i * 120);
            });
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onActive]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden flex items-center"
    >
      {scene?.videoUrl ? (
        <ForestVideoBackground />
      ) : (
        <>
          <LiveWallpaper type={wallpaperType} mouseX={mousePos.x} mouseY={mousePos.y} />
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, rgba(10, 10, 10, 0.4) 50%, rgba(10, 10, 10, 0.85) 100%)`,
            }}
          />
        </>
      )}

      <div ref={textRef} className="relative z-[2] w-full max-w-[720px] mx-auto px-6 py-24 md:py-32">
        {/* Segment number */}
        <span
          data-reveal
          className="block font-mono text-[0.7rem] tracking-[0.1em] uppercase mb-6 transition-all duration-700"
          style={{
            color: primaryColor,
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* Sound cue */}
        {segment.sound && (
          <p
            data-reveal
            className="font-body italic text-[0.95rem] md:text-[1.05rem] leading-[1.7] text-parchment/40 mb-8 max-w-[500px] transition-all duration-700"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            [{segment.sound}]
          </p>
        )}

        {/* Hebrew */}
        {segment.hebrew && (
          <div
            data-reveal
            className="my-8 pl-6 md:pl-8 py-5 pr-6 rounded-r-xl border-l-2 transition-all duration-700"
            style={{
              borderLeftColor: primaryColor,
              backgroundColor: `${primaryColor}10`,
              opacity: 0,
              transform: "translateX(-20px)",
            }}
          >
            <p className="font-display text-[1.3rem] md:text-[1.6rem] leading-[1.5]" style={{ color: primaryColor }}>
              {segment.hebrew}
            </p>
            {segment.hebrewTranslation && (
              <p className="font-body text-[0.95rem] text-parchment/50 mt-2 italic">
                &ldquo;{segment.hebrewTranslation}&rdquo;
              </p>
            )}
          </div>
        )}

        {/* Narration */}
        {segment.text.map((p, i) => (
          <p
            key={i}
            data-reveal
            className="font-body font-light text-[1.2rem] md:text-[1.35rem] leading-[1.8] text-parchment/90 mb-5 transition-all duration-600"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
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
            style={{
              opacity: 0,
              transform: "translateY(10px)",
              transitionDuration: "700ms",
            }}
          >
            <EpisodeReflection prompt={scene.reflection.prompt} primaryColor={primaryColor} />
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2">
        <div className="relative w-[1.5px] h-6 bg-parchment/20 overflow-hidden">
          <div className="absolute w-full h-2 bg-amber/60 animate-scroll-dot" />
        </div>
        <span className="font-ui font-light text-[0.65rem] tracking-[0.06em] uppercase text-parchment/30">
          Continue
        </span>
      </div>
    </section>
  );
}
