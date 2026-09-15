"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { revealDrive } from "@/lib/storyDrive";

const white = { color: "#f3f6fa", metalness: 0.12, roughness: 0.38 } as const;
const navy = { color: "#0a2a5e", metalness: 0.28, roughness: 0.42 } as const;
const ink = { color: "#141414", metalness: 0.35, roughness: 0.48 } as const;
const silver = { color: "#c5ccd4", metalness: 0.82, roughness: 0.28 } as const;

function Wheel({
  position,
  spin,
}: {
  position: [number, number, number];
  spin: { current: number };
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.x = spin.current;
  });
  return (
    <group position={position}>
      <group ref={ref} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.14, 32]} />
          <meshStandardMaterial {...ink} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 24]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.3, 0.035, 10, 36]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

function Eye({ x }: { x: number }) {
  return (
    <group position={[x, 0.12, 0.545]}>
      <mesh>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.055, 0.082, 32]} />
        <meshStandardMaterial
          color="#f3eee4"
          emissive="#c9a44a"
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function ProductBot() {
  const spin = useRef(0);

  useFrame(() => {
    spin.current = revealDrive.wheel;
  });

  return (
    <group>
      <RoundedBox args={[1.15, 0.62, 0.98]} radius={0.08} smoothness={6} position={[0, 0.42, 0]}>
        <meshStandardMaterial {...white} />
      </RoundedBox>
      <mesh position={[0.08, 0.42, -0.02]} rotation={[0, 0, -0.18]} scale={[0.55, 0.72, 1.02]}>
        <boxGeometry args={[1.05, 0.62, 0.98]} />
        <meshStandardMaterial {...navy} />
      </mesh>
      <RoundedBox args={[1.08, 0.08, 0.92]} radius={0.04} smoothness={4} position={[0, 0.74, 0.02]}>
        <meshStandardMaterial {...white} />
      </RoundedBox>
      <RoundedBox args={[0.58, 0.46, 0.08]} radius={0.04} smoothness={4} position={[0, 0.38, 0.5]}>
        <meshStandardMaterial {...ink} />
      </RoundedBox>
      <Eye x={-0.12} />
      <Eye x={0.12} />
      <RoundedBox args={[0.22, 0.28, 0.08]} radius={0.02} smoothness={3} position={[0, 0.92, -0.28]}>
        <meshStandardMaterial {...ink} />
      </RoundedBox>
      <mesh position={[0, 1.12, -0.28]}>
        <cylinderGeometry args={[0.035, 0.04, 0.16, 16]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, 1.22, -0.28]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial {...ink} />
      </mesh>
      <mesh position={[0.42, 0.58, 0.18]} rotation={[0.2, 0, 0.4]}>
        <cylinderGeometry args={[0.018, 0.018, 0.22, 10]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <Wheel position={[-0.38, 0.3, 0.38]} spin={spin} />
      <Wheel position={[0.38, 0.3, 0.38]} spin={spin} />
      <Wheel position={[-0.38, 0.3, -0.38]} spin={spin} />
      <Wheel position={[0.38, 0.3, -0.38]} spin={spin} />
    </group>
  );
}
