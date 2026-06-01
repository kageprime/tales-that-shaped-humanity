import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { stories } from "@/lib/stories";

const heroImage = "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=2000&q=80";

export default function StoriesPage() {
  return (
    <>
      <StoriesHero />
      <StoriesGrid />
    </>
  );
}

function StoriesHero() {
  return (
    <section className="relative h-[80dvh] min-h-[500px] max-h-[700px] overflow-hidden flex items-center justify-center bg-charcoal">
      <div className="absolute inset-0">
        <img src={heroImage} alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal" />
      </div>
      <div className="relative z-[2] text-center px-6 max-w-[640px]">
        <p className="font-ui text-[0.8rem] tracking-[0.15em] uppercase text-amber/80 mb-5">
          The Collection
        </p>
        <h1 className="font-display text-[clamp(3rem,8vw,5rem)] font-semibold tracking-tight leading-[1.05] text-parchment">
          Ancient Tales.
          <br />
          <span className="font-light text-parchment/80">Modern Eyes.</span>
        </h1>
        <p className="font-ui text-[1.05rem] font-light text-parchment/50 max-w-[480px] mx-auto mt-5 leading-[1.7]">
          Each narrative retold through three lenses &mdash; the timeless original, a modern interpretation, and a version for the youngest hearts.
        </p>
      </div>
    </section>
  );
}

function StoriesGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = el.querySelectorAll("[data-animate]");
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-parchment" ref={ref}>
      <div className="content-max py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stories.map((story) => (
            <Link
              key={story.slug}
              to={`/stories/${story.slug}`}
              data-animate
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
          ))}
        </div>
      </div>
    </section>
  );
}
