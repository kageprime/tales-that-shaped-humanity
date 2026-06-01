import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const trunkColor = "#4A3520";
  const leafColor = new THREE.Color().setHSL(0.28 + Math.random() * 0.06, 0.5, 0.25 + Math.random() * 0.15);

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 3]} />
        <meshStandardMaterial color={trunkColor} roughness={1} />
      </mesh>
      <mesh position={[0, 3.5, 0]}>
        <coneGeometry args={[1.8, 2.5, 8]} />
        <meshStandardMaterial color={leafColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.3, 4.5, -0.2]}>
        <coneGeometry args={[1.2, 1.8, 8]} />
        <meshStandardMaterial color={leafColor} roughness={0.8} />
      </mesh>
    </group>
  );
}

function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(60, 60, 80, 80);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      const wave = Math.sin(x * 0.5) * 0.2 + Math.cos(z * 0.4) * 0.15;
      pos.setY(i, dist < 4 ? 0 : wave * Math.min(1, (dist - 4) * 0.3));
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo}>
      <meshStandardMaterial
        color="#3A5A2A"
        roughness={0.9}
        metalness={0}
        flatShading
      />
    </mesh>
  );
}

function River() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshStandardMaterial).opacity =
        0.5 + Math.sin(clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[-8, 0.05, 5]}
      rotation={[-Math.PI / 2, 0, 0.3]}
    >
      <planeGeometry args={[3, 20]} />
      <meshStandardMaterial
        color="#4A8AAA"
        transparent
        opacity={0.5}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}

function SkyDome() {
  return (
    <mesh>
      <sphereGeometry args={[30, 32, 32]} />
      <meshBasicMaterial
        color="#87CEEB"
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function GrassPatches() {
  const patches = useMemo(() => {
    const p = [];
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 25;
      p.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        scale: 0.3 + Math.random() * 0.5,
        rot: Math.random() * Math.PI * 2,
      });
    }
    return p;
  }, []);

  return (
    <group>
      {patches.map((p, i) => (
        <mesh
          key={i}
          position={[p.x, 0, p.z]}
          rotation={[0, p.rot, 0]}
          scale={p.scale}
        >
          <planeGeometry args={[0.3, 0.5]} />
          <meshStandardMaterial
            color="#4A7A3A"
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function TestClearing() {
  const treePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 22;
      if (radius < 6) continue;
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
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-5, 5, -10]}
        intensity={0.3}
        color="#B4D4FF"
      />
      <hemisphereLight
        args={["#87CEEB", "#3A5A2A", 0.4]}
      />

      <SkyDome />
      <Terrain />
      <River />
      <GrassPatches />

      {treePositions.map((pos, i) => (
        <Tree
          key={i}
          position={pos}
          scale={0.8 + Math.random() * 0.5}
        />
      ))}

      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          color="#5A8A4A"
          roughness={0.9}
        />
      </mesh>
    </>
  );
}
