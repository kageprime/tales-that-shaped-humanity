import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TreeOfLife() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.3 + Math.sin(clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <group position={[2.5, 0, -1]}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 4]} />
        <meshStandardMaterial color="#5A3A1A" roughness={0.9} />
      </mesh>
      <mesh position={[0, 4.5, 0]}>
        <sphereGeometry args={[2.5, 8, 8]} />
        <meshStandardMaterial
          color="#4A8A3A"
          roughness={0.7}
          emissive="#8BC77A"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={glowRef} position={[0, 4.5, 0]}>
        <sphereGeometry args={[2.8, 8, 8]} />
        <meshStandardMaterial
          color="#8BC77A"
          transparent
          opacity={0.15}
          emissive="#8BC77A"
          emissiveIntensity={0.4}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function TreeOfKnowledge() {
  const fruitColors = ["#CC3333", "#DD4444", "#BB2222"];

  return (
    <group position={[-2.5, 0, 1]}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.25, 0.45, 4]} />
        <meshStandardMaterial color="#4A2A0A" roughness={0.9} />
      </mesh>
      <mesh position={[0.2, 4, 0]}>
        <sphereGeometry args={[2.2, 7, 7]} />
        <meshStandardMaterial
          color="#3A7A2A"
          roughness={0.7}
        />
      </mesh>
      <mesh position={[-0.5, 4.5, 0.3]}>
        <sphereGeometry args={[2, 7, 7]} />
        <meshStandardMaterial color="#2A6A1A" roughness={0.8} />
      </mesh>
      {/* Fruits */}
      {[
        [0.8, 3.8, 0.5],
        [-0.6, 4.2, -0.8],
        [0.3, 4.8, 0.8],
        [-0.9, 3.5, 0.6],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} scale={0.15}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial
            color={fruitColors[i % fruitColors.length]}
            roughness={0.4}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function LushTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const hue = 0.25 + Math.random() * 0.08;
  const leafColor = new THREE.Color().setHSL(hue, 0.5, 0.3 + Math.random() * 0.15);

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.12, 0.22, 3]} />
        <meshStandardMaterial color="#4A3020" roughness={1} />
      </mesh>
      <mesh position={[0.2, 3, 0.1]}>
        <sphereGeometry args={[1.5, 7, 7]} />
        <meshStandardMaterial color={leafColor} roughness={0.8} />
      </mesh>
      <mesh position={[-0.3, 4, -0.2]}>
        <sphereGeometry args={[1.2, 7, 7]} />
        <meshStandardMaterial color={leafColor} roughness={0.8} />
      </mesh>
    </group>
  );
}

function Flowers() {
  const flowers = useMemo(() => {
    const f: { x: number; z: number; color: string }[] = [];
    const colors = ["#FF6B8A", "#FFB347", "#FF69B4", "#FFD700", "#FF8C00"];
    for (let i = 0; i < 60; i++) {
      const radius = 2 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      f.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return f;
  }, []);

  return (
    <group>
      {flowers.map((f, i) => (
        <mesh
          key={i}
          position={[f.x, 0.1, f.z]}
          rotation={[Math.random() * 0.5, Math.random() * Math.PI * 2, 0]}
        >
          <planeGeometry args={[0.15, 0.15]} />
          <meshStandardMaterial color={f.color} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function GrassBlades() {
  const blades = useMemo(() => {
    const b: { x: number; z: number; h: number }[] = [];
    for (let i = 0; i < 500; i++) {
      const radius = 1.5 + Math.random() * 12;
      const angle = Math.random() * Math.PI * 2;
      b.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        h: 0.3 + Math.random() * 0.6,
      });
    }
    return b;
  }, []);

  return (
    <group>
      {blades.map((b, i) => (
        <mesh
          key={i}
          position={[b.x, 0, b.z]}
          rotation={[Math.random() * 0.3, Math.random() * Math.PI * 2, 0]}
        >
          <planeGeometry args={[0.04, b.h]} />
          <meshStandardMaterial
            color="#4A7A3A"
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function Stream() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshStandardMaterial;
      m.opacity = 0.4 + Math.sin(clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[-6, 0.05, 4]}
      rotation={[-Math.PI / 2, 0, 0.2]}
    >
      <planeGeometry args={[2.5, 18]} />
      <meshStandardMaterial
        color="#5A9ABA"
        transparent
        opacity={0.45}
        roughness={0.1}
        metalness={0.05}
      />
    </mesh>
  );
}

function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(40, 40, 60, 60);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      const wave = Math.sin(x * 0.6 + z * 0.4) * 0.15 + Math.cos(z * 0.5) * 0.1;
      pos.setY(i, dist < 3 ? 0 : wave * Math.min(1, (dist - 3) * 0.2));
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#4A6A2A"
        roughness={0.95}
        metalness={0}
        flatShading
      />
    </mesh>
  );
}

function Sky() {
  return (
    <mesh>
      <sphereGeometry args={[25, 32, 32]} />
      <meshBasicMaterial
        color="#7EC8E3"
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export default function EdenGarden() {
  const treePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * 15;
      if (radius < 5) continue;
      positions.push([
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius,
      ]);
    }
    return positions;
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[8, 12, 8]}
        intensity={1.4}
        color="#FFE4B5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-4, 6, -8]}
        intensity={0.25}
        color="#B4D4FF"
      />
      <hemisphereLight
        args={["#87CEEB", "#5A8A4A", 0.5]}
      />

      <Sky />
      <Terrain />
      <Stream />
      <GrassBlades />
      <Flowers />

      <TreeOfLife />
      <TreeOfKnowledge />

      {treePositions.map((pos, i) => (
        <LushTree
          key={i}
          position={pos}
          scale={0.6 + Math.random() * 0.4}
        />
      ))}

      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial
          color="#5A8A3A"
          roughness={0.9}
        />
      </mesh>
    </>
  );
}
