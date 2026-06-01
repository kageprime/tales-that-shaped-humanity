import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export interface CameraKeyframe {
  position: [number, number, number];
  lookAt: [number, number, number];
}

interface CameraPathProps {
  keyframes: CameraKeyframe[];
  progress: number;
  parallax?: { x: number; y: number };
}

export default function CameraPath({ keyframes, progress, parallax }: CameraPathProps) {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3());
  const posRef = useRef(new THREE.Vector3());

  useFrame(() => {
    if (keyframes.length === 0) return;

    const t = Math.max(0, Math.min(0.999, progress));
    const seg = t * (keyframes.length - 1);
    const idx = Math.floor(seg);
    const frac = seg - idx;

    const a = keyframes[idx];
    const b = keyframes[Math.min(idx + 1, keyframes.length - 1)];

    posRef.current.lerpVectors(
      new THREE.Vector3(...a.position),
      new THREE.Vector3(...b.position),
      frac
    );

    targetRef.current.lerpVectors(
      new THREE.Vector3(...a.lookAt),
      new THREE.Vector3(...b.lookAt),
      frac
    );

    if (parallax) {
      posRef.current.x += parallax.x * 0.5;
      posRef.current.y += parallax.y * 0.3;
    }

    camera.position.copy(posRef.current);
    camera.lookAt(targetRef.current);
  });

  return null;
}
