import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Play } from "lucide-react";
import { stories } from "@/lib/stories";
import { episodes } from "@/lib/episodes";
import { cn } from "@/lib/utils";

const heroImage = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2000&q=80";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StoryCollection />
      <EpisodeCollection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative h-[100dvh] min-h-[600px] max-h-[900px] overflow-hidden flex items-center justify-center bg-charcoal">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal" />
      </div>

      <div className="relative z-[2] text-center px-6 max-w-[720px]">
        <p className="font-ui text-[0.8rem] tracking-[0.15em] uppercase text-amber/80 mb-6">
          Tales That Shaped Humanity
        </p>
        <h1 className="font-display text-[clamp(3.2rem,9vw,6rem)] font-semibold tracking-tight leading-[1.05] text-parchment">
          Ancient Stories.
          <br />
          <span className="font-light text-parchment/80">Timeless Truths.</span>
        </h1>
        <p className="font-ui text-[1.05rem] md:text-[1.15rem] font-light text-parchment/50 max-w-[520px] mx-auto mt-5 leading-[1.7]">
          Rediscover the Bible&rsquo;s most powerful narratives &mdash; retold with fresh eyes for the modern reader.
        </p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 font-ui font-medium text-[0.9rem] text-charcoal bg-amber px-7 py-3.5 rounded-full hover:bg-[#E5BE6A] transition-all duration-300 no-underline"
          >
            Explore Stories
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/episodes"
            className="inline-flex items-center gap-2 font-ui text-[0.9rem] text-parchment/80 px-7 py-3.5 rounded-full border border-parchment/20 hover:border-parchment/50 hover:text-parchment transition-all duration-300 no-underline"
          >
            <Play size={14} fill="currentColor" />
            Listen
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2]">
        <div className="w-6 h-10 rounded-full border border-parchment/20 flex items-start justify-center pt-2.5">
          <div className="w-1 h-2.5 rounded-full bg-parchment/60 animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}

function StoryCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = section.querySelectorAll("[data-animate]");
            els.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stories" className="bg-parchment" ref={sectionRef}>
      <div className="content-max py-28 md:py-36">
        <div className="max-w-[600px]">
          <p
            data-animate
            className="font-ui text-[0.75rem] tracking-[0.15em] uppercase text-amber transition-all duration-700"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            The Collection
          </p>
          <h2
            data-animate
            className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] font-semibold tracking-tight leading-[1.1] text-charcoal mt-2 transition-all duration-700"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            Ancient Tales.
            <br />
            <span className="font-light text-charcoal/60">Modern Eyes.</span>
          </h2>
          <p
            data-animate
            className="font-ui text-[1rem] md:text-[1.1rem] font-light text-slate leading-[1.7] mt-4 transition-all duration-700"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            Each narrative retold through three lenses &mdash; the timeless original, a modern interpretation, and a version for the youngest hearts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-14">
          {stories.filter((s) => s.featured).map((story, i) => (
            <StoryCard key={story.slug} story={story} index={i} />
          ))}
        </div>

        <Link
          to="/stories"
          data-animate
          className="inline-flex items-center gap-2 font-ui text-[0.9rem] text-slate/60 px-6 py-3.5 rounded-full border border-slate/15 hover:border-slate/40 hover:text-slate transition-all duration-300 no-underline mt-12"
          style={{ opacity: 0, transform: "translateY(20px)", transitionDuration: "700ms" }}
        >
          View All Stories
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

function StoryCard({ story, index }: { story: (typeof stories)[0]; index: number }) {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <Link
      to={`/stories/${story.slug}`}
      ref={ref}
      className="group block no-underline rounded-2xl overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
      style={{
        opacity: 0,
        transform: "translateY(40px)",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="aspect-[16/10] overflow-hidden bg-mist">
        <img
          src={story.cardImage}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
          loading="lazy"
        />
      </div>
      <div className="p-6 md:p-7">
        <span
          className="inline-block font-ui text-[0.7rem] font-medium tracking-[0.08em] uppercase px-3 py-1 rounded-full"
          style={{
            backgroundColor: `${story.primaryColor}12`,
            color: story.primaryColor,
          }}
        >
          {story.category}
        </span>
        <h3 className="font-display text-[1.25rem] font-semibold tracking-tight text-charcoal mt-3 leading-[1.3]">
          {story.title}
        </h3>
        <p className="font-ui text-[0.9rem] font-light text-slate/80 mt-1.5 line-clamp-2 leading-relaxed">
          {story.subtitle}
        </p>
      </div>
    </Link>
  );
}

function EpisodeCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = section.querySelectorAll("[data-animate]");
            els.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const filteredEpisodes = episodes;

  return (
    <section className="bg-charcoal" ref={sectionRef}>
      <div className="content-max py-28 md:py-36">
        <div className="max-w-[600px]">
          <p
            data-animate
            className="font-ui text-[0.75rem] tracking-[0.15em] uppercase text-amber/70 transition-all duration-700"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            BIBLEVERSE
          </p>
          <h2
            data-animate
            className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] font-semibold tracking-tight leading-[1.1] text-parchment mt-2 transition-all duration-700"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            Dive Deeper
          </h2>
          <p
            data-animate
            className="font-ui text-[1rem] md:text-[1.1rem] font-light text-parchment/40 leading-[1.7] mt-4 transition-all duration-700"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            A podcast exploring the depths of Scripture &mdash; verse by verse, story by story. New episodes every week.
          </p>
        </div>

        <div className="mt-14 space-y-3">
          {filteredEpisodes.filter((ep) => ep.featured).map((ep, i) => (
            <EpisodeCard key={ep.slug} episode={ep} index={i} />
          ))}
        </div>

        <Link
          to="/episodes"
          data-animate
          className="inline-flex items-center gap-2 font-ui text-[0.9rem] text-parchment/60 px-6 py-3.5 rounded-full border border-parchment/15 hover:border-parchment/40 hover:text-parchment transition-all duration-300 no-underline mt-10"
          style={{ opacity: 0, transform: "translateY(20px)", transitionDuration: "700ms" }}
        >
          View All Episodes
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

function EpisodeCard({ episode, index }: { episode: (typeof episodes)[0]; index: number }) {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <Link
      to={`/episodes/${episode.slug}`}
      ref={ref}
      className={cn(
        "flex items-center gap-5 md:gap-7 p-5 md:p-6 rounded-2xl",
        "bg-[#0f0f0f]/90 hover:bg-[#141414]",
        "border border-parchment/[0.06] hover:border-parchment/[0.12]",
        "transition-all duration-500 no-underline group"
      )}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
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
            className="font-mono text-[0.65rem] tracking-[0.1em] uppercase"
            style={{ color: episode.primaryColor }}
          >
            {episode.episode}
          </span>
          <span className="font-ui text-[0.7rem] text-parchment/50">Podcast</span>
        </div>
        <h3 className="font-display text-[1.15rem] md:text-[1.25rem] font-semibold tracking-tight text-parchment group-hover:text-amber transition-colors truncate">
          {episode.title}
        </h3>
        <p className="font-ui text-[0.85rem] font-light text-parchment/55 mt-0.5 line-clamp-1">
          {episode.subtitle}
        </p>
      </div>
      <div className="hidden sm:flex items-center text-parchment/20 group-hover:text-parchment/40 transition-colors flex-shrink-0">
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}
