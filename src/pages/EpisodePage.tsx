import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Headphones } from "lucide-react";
import { getEpisodeBySlug, getNextEpisode } from "@/lib/episodes";
import { getEpisodeSceneConfig } from "@/lib/episode-scenes";
import LiveWallpaper, { getWallpaperType } from "@/components/LiveWallpaper";
import EpisodeChapter from "@/components/EpisodeChapter";

export default function EpisodePage() {
  const { slug } = useParams<{ slug: string }>();
  const episode = getEpisodeBySlug(slug || "");
  const sceneConfig = getEpisodeSceneConfig(slug || "");
  const scenes = sceneConfig?.scenes;
  const nextEpisode = getNextEpisode(episode?.slug ?? "");

  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      setProgressWidth(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!episode) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <h1 className="font-display text-[2rem] text-parchment">Episode not found</h1>
          <Link to="/episodes" className="text-amber hover:underline mt-4 inline-block font-ui">
            Return to episodes
          </Link>
        </div>
      </div>
    );
  }

  const segmentCount = episode.segments.length;

  return (
    <div className="bg-[#0a0a0a] text-parchment">
      {/* Persistent ambient canvas */}
      <div className="fixed inset-0 z-0 opacity-40">
        <LiveWallpaper type={getWallpaperType(0)} />
      </div>

      {/* Reading progress */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[101] transition-all duration-100"
        style={{ width: `${progressWidth}%`, backgroundColor: episode.primaryColor }}
      />

      {/* Hero */}
      <section className="relative z-[1] min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${episode.secondaryColor}40 0%, #0a0a0a 70%)`,
          }}
        />
        <div className="relative z-[2] text-center max-w-[720px] px-6 py-24">
          <span className="block font-ui text-[0.75rem] tracking-[0.15em] uppercase text-amber/70 mb-4">
            {episode.series}
          </span>
          <span
            className="inline-block font-ui text-[0.7rem] tracking-[0.1em] uppercase px-3 py-1 rounded-[40px] mb-6"
            style={{
              backgroundColor: `${episode.primaryColor}20`,
              color: episode.primaryColor,
            }}
          >
            {episode.episode}
          </span>
          <h1 className="font-display text-[clamp(2.8rem,7vw,4.8rem)] leading-[1.05] text-parchment">
            {episode.title}
          </h1>
          <p className="font-body font-light italic text-[clamp(1rem,2vw,1.3rem)] text-parchment/60 max-w-[480px] mx-auto mt-4">
            {episode.subtitle}
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 text-parchment/50">
            <Headphones size={14} />
            <span className="font-ui text-[0.85rem]">Narrated by {episode.narrator}</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2">
          <div className="relative w-[1.5px] h-6 bg-parchment/20 overflow-hidden">
            <div className="absolute w-full h-2 bg-amber/60 animate-scroll-dot" />
          </div>
          <span className="font-ui font-light text-[0.65rem] tracking-[0.06em] uppercase text-parchment/30">
            Scroll to begin
          </span>
        </div>
      </section>

      {/* Cards */}
      <div className="relative z-[1] content-max pb-24 md:pb-32">
        <div className="flex flex-col gap-8 md:gap-10">
          {episode.segments.map((segment, i) => (
            <EpisodeChapter
              key={i}
              segment={segment}
              scene={scenes?.[i]}
              primaryColor={episode.primaryColor}
              number={i + 1}
              total={segmentCount}
            />
          ))}
        </div>
      </div>

      {/* Next episode */}
      {nextEpisode && (
        <section className="relative z-[1] bg-charcoal py-16 md:py-20">
          <div className="content-max">
            <span className="block font-ui text-[0.75rem] tracking-[0.08em] uppercase text-parchment/40 mb-6">
              Next Episode
            </span>
            <Link
              to={`/episodes/${nextEpisode.slug}`}
              className="flex flex-col sm:flex-row gap-6 rounded-xl overflow-hidden bg-parchment/[0.03] hover:bg-parchment/[0.06] transition-all duration-400 no-underline group border border-parchment/10"
            >
              <div className="sm:w-[200px] aspect-[16/10] overflow-hidden flex-shrink-0 bg-dusk/50 flex items-center justify-center">
                <Headphones size={32} className="text-parchment/20" />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span className="font-ui text-[0.7rem] tracking-[0.1em] uppercase text-amber/60">
                  {nextEpisode.series} &middot; {nextEpisode.episode}
                </span>
                <h3 className="font-display font-semibold text-[1.4rem] text-parchment mt-1">
                  {nextEpisode.title}
                </h3>
                <p className="font-body font-light text-[0.9rem] text-parchment/50 mt-1">
                  {nextEpisode.subtitle}
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

    </div>
  );
}
