import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Play, Clock } from "lucide-react";
import { episodes } from "@/lib/episodes";

const visibleEpisodes = episodes;

export default function EpisodeListPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-[100dvh]">
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #D4A853 0%, transparent 60%)",
          }}
        />
        <div className="content-max relative z-[1]">
          <span className="block font-ui text-[0.75rem] tracking-[0.15em] uppercase text-amber/70 mb-3">
            Series
          </span>
          <h1 className="font-display text-[clamp(3rem,6vw,4.8rem)] leading-[1.05] text-parchment">
            BIBLEVERSE
          </h1>
          <p className="font-body font-light text-[1.1rem] md:text-[1.2rem] text-parchment/50 max-w-[560px] mt-4 leading-[1.7]">
            A podcast exploring the depths of Scripture — verse by verse, story by story. New episodes every week.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="content-max">
          <div className="grid gap-5">
            {visibleEpisodes.map((ep, i) => (
              <EpisodeCard key={ep.slug} episode={ep} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function EpisodeCard({
  episode,
  index,
}: {
  episode: (typeof episodes)[0];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, index * 100);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <Link
      to={`/episodes/${episode.slug}`}
      ref={ref}
      className="flex items-stretch gap-0 rounded-2xl overflow-hidden border border-parchment/[0.08] bg-[#0f0f0f]/90 hover:bg-[#141414] hover:border-parchment/[0.18] transition-all duration-500 no-underline group"
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Poster thumbnail */}
      <div className="hidden sm:block w-[140px] md:w-[180px] flex-shrink-0 overflow-hidden relative">
        <img
          src={episode.posterImage}
          alt={episode.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, transparent 50%, #0a0a0a 100%)`,
          }}
        />
      </div>

      <div className="flex items-center gap-5 md:gap-7 p-5 md:p-6 flex-1 min-w-0">
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundColor: `${episode.primaryColor}15` }}
        >
          <Play
            size={16}
            className="md:w-[18px] md:h-[18px] ml-0.5"
            style={{ color: episode.primaryColor, fill: episode.primaryColor }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-0.5">
            <span
              className="font-ui text-[0.65rem] tracking-[0.1em] uppercase font-medium"
              style={{ color: episode.primaryColor }}
            >
              {episode.episode}
            </span>
            <span className="font-ui text-[0.7rem] text-parchment/50">Podcast</span>
          </div>
          <h3 className="font-display text-[1.15rem] md:text-[1.3rem] font-semibold tracking-tight text-parchment group-hover:text-amber transition-colors truncate">
            {episode.title}
          </h3>
          <p className="font-ui text-[0.85rem] font-light text-parchment/35 mt-0.5 line-clamp-1 leading-relaxed">
            {episode.subtitle}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-parchment/20 flex-shrink-0">
          <Clock size={13} />
          <span className="font-ui text-[0.75rem]">12 min</span>
        </div>
      </div>
    </Link>
  );
}
