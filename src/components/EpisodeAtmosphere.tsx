import { useRef } from "react";
import EpisodeParticles from "./EpisodeParticles";
import type { ScenePalette } from "@/lib/episode-scenes";

interface EpisodeAtmosphereProps {
  scenes: ScenePalette[];
  currentSegment: number;
}

export default function EpisodeAtmosphere({ scenes, currentSegment }: EpisodeAtmosphereProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const current = scenes[Math.min(currentSegment, scenes.length - 1)];

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ isolation: "isolate" }}>
      <div
        ref={bgRef}
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{ background: current.background }}
      />

      {current.particles && current.particles.type !== "none" && (
        <EpisodeParticles config={current.particles} />
      )}

      {current.decoration && <SceneDecoration decoration={current.decoration} />}
    </div>
  );
}

function SceneDecoration({ decoration }: { decoration: NonNullable<ScenePalette["decoration"]> }) {
  const { type, opacity } = decoration;

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
      style={{ opacity }}
    >
      {type === "leaves" && (
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {[...Array(6)].map((_, i) => (
            <g key={i} style={{ animation: `leafFloat ${4 + i * 0.5}s ease-in-out infinite alternate` }}>
              <path
                d={getLeafPath(i)}
                fill="none"
                stroke="rgba(163, 213, 162, 0.15)"
                strokeWidth="1.5"
              />
            </g>
          ))}
        </svg>
      )}
      {type === "light-rays" && (
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 30%, rgba(255, 200, 50, 0.05) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 10%, rgba(255, 220, 100, 0.06) 0%, transparent 45%)
            `,
          }}
        />
      )}
      {type === "stars" && (
        <svg className="w-full h-full" viewBox="0 0 1440 900">
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1440}
              cy={Math.random() * 900}
              r={0.5 + Math.random() * 1}
              fill="rgba(255, 255, 255, 0.4)"
              style={{ animation: `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate` }}
            />
          ))}
        </svg>
      )}
      {type === "thorns" && (
        <div
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 20px,
                rgba(100, 50, 20, 0.04) 20px,
                rgba(100, 50, 20, 0.04) 21px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 20px,
                rgba(80, 40, 15, 0.03) 20px,
                rgba(80, 40, 15, 0.03) 21px
              )
            `,
          }}
        />
      )}
      {type === "scales" && (
        <div
          className="absolute inset-0"
          style={{
            background: `
              repeating-conic-gradient(
                from 45deg at 50% 50%,
                transparent 0deg 10deg,
                rgba(90, 70, 50, 0.03) 10deg 12deg,
                transparent 12deg 20deg
              )
            `,
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      )}
      {type === "gate" && (
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="w-[200px] h-[300px] md:w-[300px] md:h-[450px] opacity-[0.06]"
            style={{
              background: `
                linear-gradient(to bottom, transparent 0%, rgba(212, 168, 83, 0.3) 30%, transparent 60%),
                linear-gradient(to right, rgba(212, 168, 83, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(212, 168, 83, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 30px 30px, 30px 30px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            }}
          />
        </div>
      )}
      {type === "veil" && (
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(139, 126, 200, 0.08) 100%)",
          }}
        />
      )}
      {type === "void" && (
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)",
          }}
        />
      )}
    </div>
  );
}

function getLeafPath(i: number): string {
  const paths = [
    "M100,800 Q300,700 400,750 Q350,600 200,650 Q150,750 100,800Z",
    "M1200,200 Q1100,350 1050,300 Q1150,150 1200,200Z",
    "M800,850 Q700,750 750,700 Q850,750 800,850Z",
    "M500,100 Q600,200 550,250 Q450,200 500,100Z",
    "M1300,700 Q1200,600 1250,550 Q1350,600 1300,700Z",
    "M300,400 Q200,300 250,250 Q350,300 300,400Z",
  ];
  return paths[i % paths.length];
}
