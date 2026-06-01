import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import * as THREE from "three";
import TestClearing from "@/scenes/TestClearing";
import EdenGarden from "@/scenes/EdenGarden";
import SceneTransition from "./SceneTransition";
import type { ScenePalette } from "@/lib/episode-scenes";

type SceneType = "test" | "garden";

interface EpisodeViewer3DProps {
  sceneType: SceneType;
  segmentIndex: number;
  sceneCount: number;
  scenePalette?: ScenePalette;
}

function SceneLighting({ palette }: { palette?: ScenePalette }) {
  const { scene } = useThree();

  useEffect(() => {
    if (!palette?.background) return;
    const isDark = palette.background.includes("#0a0a12") || palette.background.includes("#0505");
    const color = new THREE.Color(isDark ? "#1a1a2e" : "#87CEEB");
    scene.background = color;
  }, [palette, scene]);

  return null;
}

function SceneContent({ sceneType }: { sceneType: SceneType }) {
  return sceneType === "garden" ? <EdenGarden /> : <TestClearing />;
}

export default function EpisodeViewer3D({ sceneType, segmentIndex, sceneCount, scenePalette }: EpisodeViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const [transitionActive, setTransitionActive] = useState(false);
  const prevSegmentRef = useRef(segmentIndex);

  useEffect(() => {
    if (prevSegmentRef.current !== segmentIndex) {
      setTransitionActive(true);
      prevSegmentRef.current = segmentIndex;
    }
  }, [segmentIndex]);

  const handleTransitionComplete = useCallback(() => {
    setTransitionActive(false);
    setTransitionKey((k) => k + 1);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden my-8 md:my-12 mx-auto select-none"
      style={{
        height: "50vh",
        minHeight: "320px",
        maxHeight: "520px",
        maxWidth: "900px",
        cursor: "grab",
        background: "#0a0a0a",
        border: "1px solid rgba(250, 246, 238, 0.08)",
        boxShadow: "0 8px 48px rgba(0, 0, 0, 0.4)",
      }}
      onMouseDown={() => {
        if (containerRef.current) containerRef.current.style.cursor = "grabbing";
      }}
      onMouseUp={() => {
        if (containerRef.current) containerRef.current.style.cursor = "grab";
      }}
    >
      <Canvas
        camera={{ fov: 50, near: 0.1, far: 100, position: [4, 2.5, 8] }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0a0a0a");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
      >
        <Sky
          distance={100}
          sunPosition={[-0.8, 0.19, 0.56]}
          turbidity={0}
          rayleigh={3}
          mieDirectionalG={0.7}
        />

        <ambientLight intensity={0.4} />
        <directionalLight position={[8, 12, 8]} intensity={1.2} color="#FFE4B5" />
        <directionalLight position={[-4, 6, -8]} intensity={0.3} color="#B4D4FF" />
        <hemisphereLight args={["#87CEEB", "#5A8A4A", 0.4]} />

        <SceneLighting palette={scenePalette} />

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          enableZoom={true}
          zoomSpeed={0.5}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={-Math.PI / 2}
          maxAzimuthAngle={Math.PI / 2}
          target={[0, 0.7, 0]}
        />

        <SceneContent sceneType={sceneType} />
      </Canvas>

      <SceneTransition
        key={transitionKey}
        active={transitionActive}
        onComplete={handleTransitionComplete}
      />

      <div className="absolute bottom-3 left-3 z-[2] flex gap-2">
        {Array.from({ length: sceneCount }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === segmentIndex ? "rgba(250, 246, 238, 0.7)" : "rgba(250, 246, 238, 0.2)",
              transform: i === segmentIndex ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
