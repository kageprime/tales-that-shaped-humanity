interface ForestVideoBackgroundProps {
  src?: string;
}

export default function ForestVideoBackground({ src }: ForestVideoBackgroundProps) {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <source
          src={src ?? "https://cdn.free-stock.video/1982021/rain-fog-landscape-forest-nature-forest-tree-64910-full.mp4"}
          type="video/mp4"
        />
      </video>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </>
  );
}
