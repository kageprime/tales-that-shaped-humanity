import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Clock, Layers, BookOpen } from "lucide-react";
import { getStoryBySlug, getNextStory } from "@/lib/stories";
import { getEpisodeBySlug } from "@/lib/episodes";
import type { StoryPerspective } from "@/lib/stories";
import PlayButton from "@/components/PlayButton";
import type { AudioTrack } from "@/hooks/useAudioPlayer";

type PerspectiveKey = "classic" | "modern" | "kids" | "episodes";

const baseLabels: { key: "classic" | "modern" | "kids"; label: string }[] = [
  { key: "classic", label: "Classic" },
  { key: "modern", label: "Modern" },
  { key: "kids", label: "For Kids" },
];

export default function StoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const story = getStoryBySlug(slug || "");
  const hasEpisodes = (story?.episodes?.length ?? 0) > 0;
  const [perspective, setPerspective] = useState<PerspectiveKey>(hasEpisodes ? "episodes" : "classic");
  const [contentVisible, setContentVisible] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const content = contentRef.current;
      if (!content) return;
      const rect = content.getBoundingClientRect();
      const total = content.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      setProgressWidth(pct);

      // Nav auto-hide
      setNavVisible(true);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      navTimerRef.current = setTimeout(() => setNavVisible(false), 3000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    };
  }, [perspective]);

  const switchPerspective = useCallback((p: PerspectiveKey) => {
    if (p === perspective) return;
    setContentVisible(false);
    setTimeout(() => {
      setPerspective(p);
      setContentVisible(true);
    }, 200);
  }, [perspective]);

  if (!story) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-parchment">
        <div className="text-center">
          <h1 className="font-display text-[2rem] text-charcoal">Story not found</h1>
          <Link to="/" className="text-amber hover:underline mt-4 inline-block font-ui">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const perspectiveLabels = hasEpisodes
    ? [...baseLabels, { key: "episodes" as const, label: "Episodes" }]
    : baseLabels;

  const currentPerspective: StoryPerspective | undefined = perspective === "episodes" ? undefined : story.perspectives[perspective];
  const nextStory = getNextStory(story.slug);

  return (
    <div className="bg-parchment">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[101] transition-all duration-100"
        style={{ width: `${progressWidth}%`, backgroundColor: story.primaryColor }}
      />

      {/* Story Hero */}
      <section className="relative h-[100dvh] overflow-hidden flex items-end">
        <img
          src={story.heroImage}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26, 23, 20, 0.3) 0%, rgba(26, 23, 20, 0.7) 100%)",
          }}
        />
        <div className="relative z-[2] px-6 md:px-12 pb-16 md:pb-20 max-w-[800px]">
          <span
            className="inline-block font-ui font-medium text-[0.8rem] px-3.5 py-1 rounded-[40px] mb-3"
            style={{
              backgroundColor: `${story.primaryColor}30`,
              color: story.primaryColor,
            }}
          >
            {story.category}
          </span>
          <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] leading-[1.05] text-parchment">
            {story.title}
          </h1>
          <p className="font-body font-light italic text-[clamp(1.1rem,2vw,1.4rem)] text-parchment/80 max-w-[480px] mt-3">
            {story.subtitle}
          </p>
          <div className="flex items-center gap-6 mt-6 text-parchment/60">
            <span className="flex items-center gap-2 font-ui font-light text-[0.9rem]">
              <Clock size={15} /> {story.readingTime}
            </span>
            <span className="flex items-center gap-2 font-ui font-light text-[0.9rem]">
              <Layers size={15} /> {hasEpisodes ? "4" : "3"} Perspectives
            </span>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <div ref={contentRef} className="reading-max py-16 md:py-20">
        <div
          className="transition-opacity duration-200"
          style={{ opacity: contentVisible ? 1 : 0 }}
        >
          {perspective === "episodes" ? (
            <EpisodeTab story={story} />
          ) : (
            currentPerspective?.chapters.map((chapter, ci) => (
              <ChapterBlock
                key={`${perspective}-${ci}`}
                chapter={chapter}
                storyColor={story.primaryColor}
                chapterImage={
                  ci === 0 ? story.heroImage :
                  ci === 1 ? story.chapterImage :
                  story.cardImage
                }
                audioTrack={{
                  id: `${story.slug}-${perspective}-${chapter.number}`,
                  title: chapter.title,
                  chapterNumber: chapter.number,
                  paragraphs: chapter.paragraphs,
                }}
                isLast={ci === currentPerspective.chapters.length - 1}
              />
            ))
          )}
        </div>
      </div>

      {/* Next Story */}
      {nextStory && (
        <section className="bg-warm-cream py-12 md:py-16">
          <div className="content-max">
            <span className="block font-mono text-[0.8rem] tracking-[0.08em] uppercase text-slate mb-4">
              Continue Reading
            </span>
            <Link
              to={`/stories/${nextStory.slug}`}
              className="flex flex-col sm:flex-row gap-6 bg-warm-cream rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-400 no-underline group"
            >
              <div className="sm:w-[240px] aspect-[16/10] overflow-hidden flex-shrink-0">
                <img
                  src={nextStory.cardImage}
                  alt={nextStory.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-400"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span
                  className="inline-block self-start font-ui font-medium text-[0.75rem] px-3 py-1 rounded-[40px] mb-2"
                  style={{
                    backgroundColor: `${nextStory.primaryColor}18`,
                    color: nextStory.primaryColor,
                  }}
                >
                  {nextStory.category}
                </span>
                <h3 className="font-display font-semibold text-[1.5rem] text-charcoal">
                  {nextStory.title}
                </h3>
                <p className="font-body font-light text-[0.95rem] text-slate mt-1">
                  {nextStory.subtitle}
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Floating Story Navigation */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-charcoal/90 backdrop-blur-[16px] rounded-[40px] px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-opacity duration-300"
        style={{ opacity: navVisible ? 1 : 0 }}
      >
        <Link
          to="/#stories"
          className="hidden sm:flex items-center gap-1.5 text-parchment font-ui text-[0.85rem] hover:text-amber transition-colors no-underline"
        >
          <ArrowLeft size={14} />
          Back to Stories
        </Link>
        <div className="hidden sm:block w-[1px] h-6 bg-parchment/20" />
        <div className="flex items-center bg-parchment/10 rounded-[40px] p-1">
          {perspectiveLabels.map((p) => (
            <button
              key={p.key}
              onClick={() => switchPerspective(p.key)}
              className="px-4 py-1.5 rounded-[40px] font-ui text-[0.8rem] transition-all duration-200 cursor-pointer border-none"
              style={{
                backgroundColor: perspective === p.key ? "#D4A853" : "transparent",
                color: perspective === p.key ? "#1A1714" : "rgba(250, 246, 238, 0.6)",
                fontWeight: perspective === p.key ? 500 : 400,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="hidden sm:block w-[1px] h-6 bg-parchment/20" />
        <button
          onClick={() => document.getElementById("chapter-list")?.scrollIntoView({ behavior: "smooth" })}
          className="hidden sm:flex items-center gap-1.5 text-parchment font-ui text-[0.85rem] hover:text-amber transition-colors bg-transparent border-none cursor-pointer"
        >
          <BookOpen size={14} />
          Contents
        </button>
      </div>
    </div>
  );
}

function ChapterBlock({
  chapter,
  storyColor,
  chapterImage,
  audioTrack,
  isLast,
}: {
  chapter: StoryPerspective["chapters"][0];
  storyColor: string;
  chapterImage?: string;
  audioTrack?: AudioTrack;
  isLast?: boolean;
}) {
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
              }, i * 80);
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
    <div ref={ref} className={isLast ? "" : "mb-16 md:mb-20"}>
      {/* Chapter heading */}
      <div className="relative mb-8" id={chapter.number === "01" ? "chapter-list" : undefined}>
        <span
          data-reveal
          className="absolute -top-8 -left-4 font-display text-[8rem] md:text-[12rem] leading-none pointer-events-none select-none transition-all duration-700"
          style={{ color: `${storyColor}10`, opacity: 0, transform: "scale(0.8)" }}
        >
          {chapter.number}
        </span>
        <span
          data-reveal
          className="block font-mono text-[0.8rem] tracking-[0.08em] uppercase mb-2 transition-all duration-700"
          style={{ color: storyColor, opacity: 0, transform: "translateY(30px)" }}
        >
          Chapter {chapter.number}
        </span>
        <h2
          data-reveal
          className="font-display font-semibold text-[1.6rem] md:text-[2rem] text-charcoal leading-[1.2] transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          {chapter.title}
        </h2>
        {audioTrack && (
          <div
            data-reveal
            className="mt-4 transition-all duration-700"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <PlayButton track={audioTrack} size="sm" />
          </div>
        )}
      </div>

      {/* Body paragraphs */}
      {chapter.paragraphs.map((p, i) => (
        <p
          key={i}
          data-reveal
          className="font-body font-light text-[1.15rem] md:text-[1.25rem] leading-[1.8] text-charcoal/90 mb-5 transition-all duration-600"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {p}
        </p>
      ))}

      {/* Pull quote */}
      {chapter.quote && (
        <blockquote
          data-reveal
          className="my-8 pl-6 md:pl-8 py-5 pr-6 rounded-r-xl border-l-4 transition-all duration-700"
          style={{
            borderLeftColor: storyColor,
            backgroundColor: `${storyColor}0D`,
            opacity: 0,
            transform: "translateX(-20px)",
          }}
        >
          <p
            className="font-display italic text-[1.2rem] md:text-[1.4rem] leading-[1.5]"
            style={{ color: storyColor }}
          >
            &ldquo;{chapter.quote}&rdquo;
          </p>
        </blockquote>
      )}

      {/* Chapter image */}
      {chapterImage && (
        <div
          data-reveal
          className="mt-10 -mx-6 md:-mx-0 rounded-xl overflow-hidden aspect-[16/9]"
          style={{ opacity: 0, transform: "scale(0.98)", transitionDuration: "1000ms" }}
        >
          <ParallaxImage src={chapterImage} alt={chapter.title} />
        </div>
      )}
    </div>
  );
}

interface ChapterGroup {
  number: string;
  title: string;
  sound?: string;
  hebrew?: string;
  hebrewTranslation?: string;
  paragraphs: string[];
  quote?: string;
}

function groupSegmentsIntoChapters(ep: NonNullable<ReturnType<typeof getEpisodeBySlug>>): ChapterGroup[] {
  const segs = ep.segments;

  if (ep.slug === "e2-the-garden-and-the-voice") {
    return [
      {
        number: "01",
        title: "The Garden Planted",
        sound: segs[0]?.sound,
        paragraphs: segs[0]?.text ?? [],
        quote: "East, in Eden — a name that in Hebrew whispers delight.",
      },
      {
        number: "02",
        title: "The Tree and the Command",
        sound: segs[1]?.sound,
        hebrew: segs[1]?.hebrew,
        hebrewTranslation: segs[1]?.hebrewTranslation,
        paragraphs: segs[1]?.text ?? [],
      },
      {
        number: "03",
        title: "The Serpent's Deception",
        sound: segs[2]?.sound,
        paragraphs: segs[2]?.text ?? [],
        quote: "The temptation was not to wickedness, but to divinity.",
      },
      {
        number: "04",
        title: "The Eating",
        sound: segs[3]?.sound,
        paragraphs: segs[3]?.text ?? [],
        quote: "Their eyes were opened — but not to glory. To nakedness.",
      },
      {
        number: "05",
        title: "Where Are You?",
        sound: segs[4]?.sound,
        hebrew: segs[4]?.hebrew,
        hebrewTranslation: segs[4]?.hebrewTranslation,
        paragraphs: segs[4]?.text ?? [],
        quote: "Where are you? — not an interrogator's demand, but a father's call.",
      },
      {
        number: "06",
        title: "The Curse and the Promise",
        sound: segs[5]?.sound,
        paragraphs: segs[5]?.text ?? [],
        quote: "A proto-gospel, whispered in the ruins.",
      },
      {
        number: "07",
        title: "Garments of Skin",
        sound: segs[6]?.sound,
        paragraphs: segs[6]?.text ?? [],
        quote: "God will kill to cover, will shed blood to make modest the ones who rebelled.",
      },
      {
        number: "08",
        title: "The Fracture of Trust",
        sound: segs[7]?.sound,
        paragraphs: segs[7]?.text ?? [],
      },
      {
        number: "09",
        title: "Where Are You Hiding?",
        sound: segs[8]?.sound,
        paragraphs: segs[8]?.text ?? [],
      },
      {
        number: "10",
        title: "Until Next Time",
        sound: segs[9]?.sound,
        paragraphs: segs[9]?.text ?? [],
      },
    ];
  }

  return segs.map((seg, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: `Chapter ${i + 1}`,
    sound: seg.sound,
    hebrew: seg.hebrew,
    hebrewTranslation: seg.hebrewTranslation,
    paragraphs: seg.text,
  }));
}

function SegmentBlock({
  chapter,
  storyColor,
  chapterImage,
  audioTrack,
  isLast,
}: {
  chapter: ChapterGroup;
  storyColor: string;
  chapterImage?: string;
  audioTrack?: AudioTrack;
  isLast: boolean;
}) {
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
              }, i * 80);
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
    <div ref={ref} className={isLast ? "" : "mb-16 md:mb-20"}>
      <div className="relative mb-8">
        <span
          data-reveal
          className="absolute -top-8 -left-4 font-display text-[8rem] md:text-[12rem] leading-none pointer-events-none select-none transition-all duration-700"
          style={{ color: `${storyColor}10`, opacity: 0, transform: "scale(0.8)" }}
        >
          {chapter.number}
        </span>
        <span
          data-reveal
          className="block font-mono text-[0.8rem] tracking-[0.08em] uppercase mb-2 transition-all duration-700"
          style={{ color: storyColor, opacity: 0, transform: "translateY(30px)" }}
        >
          Chapter {chapter.number}
        </span>
        <h2
          data-reveal
          className="font-display font-semibold text-[1.6rem] md:text-[2rem] text-charcoal leading-[1.2] transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          {chapter.title}
        </h2>
        {audioTrack && (
          <div
            data-reveal
            className="mt-4 transition-all duration-700"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <PlayButton track={audioTrack} size="sm" />
          </div>
        )}
      </div>

      {chapter.sound && (
        <p
          data-reveal
          className="font-body italic text-[1rem] md:text-[1.1rem] leading-[1.7] text-slate/50 mb-6 max-w-[500px] transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          [{chapter.sound}]
        </p>
      )}

      {chapter.hebrew && (
        <div
          data-reveal
          className="my-8 pl-6 md:pl-8 py-5 pr-6 rounded-r-xl border-l-2 transition-all duration-700"
          style={{
            borderLeftColor: storyColor,
            backgroundColor: `${storyColor}10`,
            opacity: 0,
            transform: "translateX(-20px)",
          }}
        >
          <p className="font-display text-[1.3rem] md:text-[1.6rem] leading-[1.5]" style={{ color: storyColor }}>
            {chapter.hebrew}
          </p>
          {chapter.hebrewTranslation && (
            <p className="font-body text-[1rem] text-slate mt-2 italic">
              &ldquo;{chapter.hebrewTranslation}&rdquo;
            </p>
          )}
        </div>
      )}

      {chapter.paragraphs.map((p, i) => (
        <p
          key={i}
          data-reveal
          className="font-body font-light text-[1.15rem] md:text-[1.25rem] leading-[1.8] text-charcoal/90 mb-5 transition-all duration-600"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {p}
        </p>
      ))}

      {chapter.quote && (
        <blockquote
          data-reveal
          className="my-8 pl-6 md:pl-8 py-5 pr-6 rounded-r-xl border-l-4 transition-all duration-700"
          style={{
            borderLeftColor: storyColor,
            backgroundColor: `${storyColor}0D`,
            opacity: 0,
            transform: "translateX(-20px)",
          }}
        >
          <p className="font-display italic text-[1.2rem] md:text-[1.4rem] leading-[1.5]" style={{ color: storyColor }}>
            &ldquo;{chapter.quote}&rdquo;
          </p>
        </blockquote>
      )}

      {chapterImage && (
        <div
          data-reveal
          className="mt-10 -mx-6 md:-mx-0 rounded-xl overflow-hidden aspect-[16/9]"
          style={{ opacity: 0, transform: "scale(0.98)", transitionDuration: "1000ms" }}
        >
          <ParallaxImage src={chapterImage} alt={chapter.title} />
        </div>
      )}
    </div>
  );
}

function EpisodeTab({ story }: { story: NonNullable<ReturnType<typeof getStoryBySlug>> }) {
  const episodeSlugs = story.episodes ?? [];
  const activeEpisode = episodeSlugs.map((slug) => getEpisodeBySlug(slug)).filter(Boolean)[0];

  if (!activeEpisode) return null;

  const chapters = groupSegmentsIntoChapters(activeEpisode);
  const storyColor = story.primaryColor;

  return (
    <div>
      {chapters.map((chapter, i) => (
        <SegmentBlock
          key={chapter.number}
          chapter={chapter}
          storyColor={storyColor}
          chapterImage={
            i % 3 === 0 ? story.heroImage :
            i % 3 === 1 ? story.chapterImage :
            story.cardImage
          }
          audioTrack={{
            id: `${activeEpisode.slug}-${chapter.number}`,
            title: chapter.title,
            chapterNumber: chapter.number,
            paragraphs: chapter.paragraphs,
          }}
          isLast={i === chapters.length - 1}
        />
      ))}
    </div>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    const parent = img.parentElement;
    if (!parent) return;

    const handleScroll = () => {
      const rect = parent.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const y = (progress - 0.5) * 30;
      img.style.transform = `translateY(${y}%)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className="w-full h-[130%] object-cover transition-transform duration-100"
      loading="lazy"
    />
  );
}
