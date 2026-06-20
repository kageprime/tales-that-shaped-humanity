import { BookOpen, Eye, Heart, Sparkles, Users, Globe } from "lucide-react";
import { useAuthModal } from "@/components/AuthModal";
import { useReveal } from "@/hooks/useReveal";

const heroImage = "https://images.unsplash.com/photo-1504052434562-0f2f1b5e7e2a?w=2000&q=80";

const features = [
  { icon: BookOpen, title: "Respect for the Source", description: "We honor the original texts and their cultural contexts, ensuring every retelling is grounded in scholarship and authenticity." },
  { icon: Eye, title: "Fresh Perspectives", description: "We believe these stories gain power when viewed through multiple lenses — inviting readers to see familiar narratives in new ways." },
  { icon: Heart, title: "Universal Access", description: "These stories belong to everyone. We craft versions for every age and background, removing barriers to engagement." },
  { icon: Sparkles, title: "Artistic Excellence", description: "From our prose to our illustrations, we pursue the highest standards of craft — because these stories deserve nothing less." },
  { icon: Users, title: "Community First", description: "We exist to serve readers. Your feedback shapes our direction, and your stories enrich our understanding." },
  { icon: Globe, title: "Timeless Relevance", description: "We bridge millennia, showing how ancient wisdom speaks directly to the challenges and joys of contemporary life." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <OurStory />
      <WhatWeBelieve />
      <JoinCTA />
    </>
  );
}

function PageHero() {
  return (
    <section className="relative h-[90dvh] min-h-[500px] max-h-[750px] overflow-hidden flex items-center justify-center bg-charcoal">
      <div className="absolute inset-0">
        <img src={heroImage} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal" />
      </div>
      <div className="relative z-[2] text-center px-6 max-w-[700px]">
        <p className="font-ui text-[0.8rem] tracking-[0.15em] uppercase text-amber/80 mb-5">
          About Us
        </p>
        <h1 className="font-display text-[clamp(2.8rem,6vw,4.8rem)] font-semibold tracking-tight leading-[1.05] text-parchment">
          Bringing Ancient Wisdom
          <br />
          <span className="font-light text-parchment/80">to Modern Hearts</span>
        </h1>
        <p className="font-ui text-[1.05rem] font-light text-parchment/60 max-w-[560px] mx-auto mt-5 leading-[1.7]">
          We believe these timeless narratives hold profound meaning for every generation. Our mission is to share them with beauty, authenticity, and accessibility.
        </p>
      </div>
    </section>
  );
}

function OurStory() {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.1, stagger: 100, attribute: "data-animate" });

  return (
    <section className="bg-parchment py-20 md:py-28" ref={ref}>
      <div className="content-max">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          <div className="md:w-[45%] w-full">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
              <img
                src={heroImage}
                alt="Generations holding a Bible"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:w-[55%]">
            <span
              data-animate
              className="block font-ui text-[0.8rem] tracking-[0.15em] uppercase text-amber transition-all duration-700"
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              Our Story
            </span>
            <h2
              data-animate
              className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold tracking-tight leading-[1.1] text-charcoal mt-2 transition-all duration-700"
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              A Journey Through Time
            </h2>
            <div className="mt-6 space-y-5">
              {[
                "Tales That Shaped Humanity began with a simple question: What if the world's most influential stories were told with the same cinematic care we give to modern films and literature?",
                "Founded in 2025, our team of writers, scholars, and artists came together with a shared passion for these ancient narratives. We represent diverse backgrounds and beliefs — united by our conviction that these stories belong to everyone.",
                "Each story in our collection is carefully researched, beautifully written, and thoughtfully illustrated. We work with theologians, historians, and literary scholars to ensure accuracy while crafting narratives that resonate with contemporary readers.",
              ].map((p, i) => (
                <p
                  key={i}
                  data-animate
                  className="font-ui font-light text-[1.1rem] leading-[1.75] text-charcoal/80 transition-all duration-700"
                  style={{ opacity: 0, transform: "translateY(40px)" }}
                >
                  {p}
                </p>
              ))}
            </div>
            <button
              data-animate
              className="mt-6 font-ui font-medium text-[0.95rem] text-charcoal px-7 py-3 rounded-[40px] border-[1.5px] border-charcoal hover:bg-charcoal hover:text-parchment transition-all duration-300 cursor-pointer"
              style={{ opacity: 0, transform: "translateY(40px)", transitionDuration: "700ms" }}
            >
              Meet the Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeBelieve() {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.1, stagger: 100, attribute: "data-animate" });

  return (
    <section className="bg-mist/30 py-20 md:py-28" ref={ref}>
      <div className="content-max text-center">
        <span
          data-animate
          className="block font-ui text-[0.8rem] tracking-[0.15em] uppercase text-amber transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          Our Values
        </span>
        <h2
          data-animate
          className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold tracking-tight leading-[1.1] text-charcoal mt-2 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          What Guides Our Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
          {features.map((f, i) => (
            <div
              key={f.title}
              data-animate
              className="bg-white rounded-2xl p-7 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-400"
              style={{
                opacity: 0,
                transform: "translateY(40px)",
                transitionDelay: `${i * 60}ms`,
                transitionDuration: "700ms",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="w-11 h-11 rounded-full bg-amber/10 flex items-center justify-center">
                <f.icon size={20} className="text-amber" />
              </div>
              <h3 className="font-display text-[1.15rem] font-semibold tracking-tight text-charcoal mt-5">
                {f.title}
              </h3>
              <p className="font-ui font-light text-[0.95rem] text-slate/80 mt-2 leading-[1.65]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinCTA() {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.3, stagger: 150, attribute: "data-animate" });
  const { openAuth } = useAuthModal();

  return (
    <section ref={ref} className="bg-charcoal py-20 md:py-[100px] text-center">
      <div className="max-w-[640px] mx-auto px-6">
        <h2
          data-animate
          className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold tracking-tight leading-[1.1] text-parchment transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          Be Part of the Story
        </h2>
        <p
          data-animate
          className="font-ui font-light text-[1.1rem] leading-[1.75] text-parchment/60 mt-3 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          Join thousands of readers rediscovering these timeless narratives.
        </p>
        <button
          data-animate
          onClick={() => openAuth("register")}
          className="mt-8 bg-amber text-charcoal font-ui font-semibold text-[0.95rem] px-7 py-3 rounded-[40px] hover:bg-[#E5BE6A] hover:shadow-[0_4px_20px_rgba(212,168,83,0.3)] transition-all duration-300 cursor-pointer"
          style={{ opacity: 0, transform: "translateY(40px)", transitionDuration: "700ms" }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
