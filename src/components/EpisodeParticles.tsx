import { useRef, useEffect } from "react";
import type { SceneParticles } from "@/lib/episode-scenes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
  targetAlpha: number;
}

export default function EpisodeParticles({ config, paused }: { config: SceneParticles; paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
  const count = isMobile ? Math.round(config.count * 0.3) : config.count;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || config.type === "none") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(w, h, config));
    }
    particlesRef.current = particles;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (paused) return;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        p.alpha += (p.targetAlpha - p.alpha) * 0.02;

        if (p.life > p.maxLife || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          const np = createParticle(w, h, config);
          p.x = np.x;
          p.y = np.y;
          p.vx = np.vx;
          p.vy = np.vy;
          p.life = 0;
          p.size = np.size;
          p.color = np.color;
          p.targetAlpha = np.targetAlpha;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * config.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      const ndpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cw * ndpr;
      canvas.height = ch * ndpr;
      ctx.scale(ndpr, ndpr);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [count, config, paused]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

function createParticle(w: number, h: number, config: SceneParticles): Particle {
  const color = config.colors[Math.floor(Math.random() * config.colors.length)];
  const isStatic = config.type === "dust";
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * config.speed * (isStatic ? 0.3 : 1),
    vy: (Math.random() - 0.5) * config.speed * (isStatic ? 0.3 : 1),
    life: Math.random() * 100,
    maxLife: 100 + Math.random() * 200,
    size: config.type === "fireflies" ? 1.5 + Math.random() * 2 : 0.5 + Math.random() * 1.5,
    color,
    alpha: 0,
    targetAlpha: config.type === "motes" ? 0.4 + Math.random() * 0.6 : config.type === "fireflies" ? 0.6 + Math.random() * 0.4 : 0.2 + Math.random() * 0.5,
  };
}
