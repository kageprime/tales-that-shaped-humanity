import { useRef, useEffect, useMemo } from "react";

export type WallpaperType =
  | "garden"
  | "golden"
  | "shadow"
  | "void"
  | "evening"
  | "harsh"
  | "thorns"
  | "gate"
  | "dawn"
  | "twilight"
  | "silence";

interface LiveWallpaperProps {
  type: WallpaperType;
  mouseX?: number;
  mouseY?: number;
}

const palette: Record<WallpaperType, { colors: string[]; blobCount: number; speed: number }> = {
  garden: { colors: ["#2D4A22", "#4A7C3F", "#6BA85A", "#3A5A2A"], blobCount: 5, speed: 6 },
  golden: { colors: ["#3A5A2A", "#D4A853", "#8B6914", "#2A4A1A"], blobCount: 4, speed: 5 },
  shadow: { colors: ["#1A2A10", "#2A3A1A", "#0F1508", "#1A2A10"], blobCount: 6, speed: 4 },
  void: { colors: ["#2A2A2A", "#3A3A3A", "#1A1A1A", "#2A2A2A"], blobCount: 3, speed: 2 },
  evening: { colors: ["#0F1A2A", "#1A2A3A", "#2A3A4A", "#080E15"], blobCount: 5, speed: 5 },
  harsh: { colors: ["#3A2A1A", "#5A3A1A", "#2A1A0A", "#4A2A1A"], blobCount: 4, speed: 7 },
  thorns: { colors: ["#1A0A02", "#2A1505", "#3A2010", "#0A0502"], blobCount: 6, speed: 3 },
  gate: { colors: ["#0F0F1A", "#1A1A2A", "#2A2A3A", "#05050A"], blobCount: 4, speed: 4 },
  dawn: { colors: ["#0A1A0A", "#1A2A1A", "#2A3A2A", "#3A4A3A"], blobCount: 3, speed: 3 },
  twilight: { colors: ["#0A0A1A", "#1A1A3A", "#2A2A4A", "#050510"], blobCount: 5, speed: 5 },
  silence: { colors: ["#050508", "#0A0A0F", "#050508", "#020204"], blobCount: 2, speed: 1 },
};

export default function LiveWallpaper({ type, mouseX = 0, mouseY = 0 }: LiveWallpaperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const config = palette[type];

  const blobs = useMemo(() => {
    return Array.from({ length: config.blobCount }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.15 + Math.random() * 0.25,
      vx: (Math.random() - 0.5) * 0.002 * config.speed,
      vy: (Math.random() - 0.5) * 0.002 * config.speed,
      color: config.colors[i % config.colors.length],
      phase: Math.random() * Math.PI * 2,
    }));
  }, [type, config.blobCount, config.colors, config.speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = (t: number) => {
      rafRef.current = requestAnimationFrame(animate);
      timeRef.current = t * 0.001;

      ctx.clearRect(0, 0, w, h);

      // Draw each blob
      for (const blob of blobs) {
        const bx = (blob.x + Math.sin(timeRef.current * 0.001 * config.speed + blob.phase) * 0.05) * w;
        const by = (blob.y + Math.cos(timeRef.current * 0.001 * config.speed * 0.7 + blob.phase) * 0.05) * h;
        const br = blob.r * Math.max(w, h);

        // Mouse influence
        const mx = (mouseX / window.innerWidth) * w;
        const my = (mouseY / window.innerHeight) * h;
        const dx = mx - bx;
        const dy = my - by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 1 - dist / (w * 0.3)) * 20;

        const grad = ctx.createRadialGradient(bx + dx * pull * 0.01, by + dy * pull * 0.01, 0, bx, by, br);
        grad.addColorStop(0, blob.color + "40");
        grad.addColorStop(0.4, blob.color + "25");
        grad.addColorStop(1, blob.color + "00");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle noise overlay
      for (let i = 0; i < 60; i++) {
        const nx = Math.random() * w;
        const ny = Math.random() * h;
        const ns = 1 + Math.random() * 2;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.015})`;
        ctx.fillRect(nx, ny, ns, ns);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [blobs, config.speed, mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

export function getWallpaperType(index: number): WallpaperType {
  const types: WallpaperType[] = [
    "garden",
    "golden",
    "shadow",
    "void",
    "evening",
    "harsh",
    "thorns",
    "gate",
    "dawn",
    "twilight",
    "silence",
  ];
  return types[index % types.length];
}
