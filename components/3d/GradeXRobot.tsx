"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const steel = {
  color: "#c5ccd4",
  metalness: 0.92,
  roughness: 0.28,
} as const;

const steelDark = {
  color: "#8b949e",
  metalness: 0.88,
  roughness: 0.32,
} as const;

const rubber = {
  color: "#151515",
  metalness: 0.15,
  roughness: 0.55,
} as const;

const brass = {
  color: "#c9a44a",
  metalness: 1,
  roughness: 0.22,
} as const;

const _stad = new THREE.Vector3();

function stadiumPoint(t: number, length: number, height: number, out = _stad) {
  const r = height / 2;
  const straight = length;
  const cap = Math.PI * r;
  const peri = 2 * straight + 2 * cap;
  let d = ((t % 1) + 1) % 1 * peri;
  if (d < straight) return out.set(-length / 2 + d, -r, 0);
  d -= straight;
  if (d < cap) {
    const a = -Math.PI / 2 + (d / cap) * Math.PI;
    return out.set(length / 2, Math.sin(a) * r, 0);
  }
  d -= cap;
  if (d < straight) return out.set(length / 2 - d, r, 0);
  d -= straight;
  const a = Math.PI / 2 + (d / cap) * Math.PI;
  return out.set(-length / 2, Math.sin(a) * r, 0);
}

function Track({ side }: { side: 1 | -1 }) {
  const pads = 18;
  const group = useRef<THREE.Group>(null);
  const sprocketA = useRef<THREE.Group>(null);
  const sprocketB = useRef<THREE.Group>(null);
  const z = side * 0.268;

  useFrame((_, delta) => {
    const spin = delta * 2.4;
    if (group.current) group.current.userData.t = (group.current.userData.t || 0) + spin * 0.12;
    const t = group.current?.userData.t || 0;
    group.current?.children.forEach((child, i) => {
      const p = stadiumPoint(t + i / pads, 0.78, 0.22);
      child.position.set(p.x, p.y - 0.02, 0);
    });
    if (sprocketA.current) sprocketA.current.rotation.z -= spin;
    if (sprocketB.current) sprocketB.current.rotation.z -= spin;
  });

  const chevrons = [0.22, 0.08, -0.06, -0.2];

  return (
    <group position={[0, 0, z]}>
      <mesh>
        <boxGeometry args={[0.9, 0.26, 0.035]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      {chevrons.map((x) => (
        <group key={x} position={[x, 0.01, side * 0.02]} rotation={[0, 0, side === 1 ? 0 : Math.PI]}>
          <mesh position={[0.02, 0.035, 0]} rotation={[0, 0, 0.55]}>
            <boxGeometry args={[0.09, 0.018, 0.01]} />
            <meshStandardMaterial {...steelDark} />
          </mesh>
          <mesh position={[0.02, -0.035, 0]} rotation={[0, 0, -0.55]}>
            <boxGeometry args={[0.09, 0.018, 0.01]} />
            <meshStandardMaterial {...steelDark} />
          </mesh>
        </group>
      ))}
      {[
        [-0.28, 0.07],
        [-0.08, 0.07],
        [0.12, 0.07],
        [0.28, -0.04],
      ].map(([x, y]) => (
        <mesh key={`${x}${y}`} position={[x, y, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.05, 12]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.5} />
        </mesh>
      ))}
      <group ref={sprocketA} position={[0.34, -0.02, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.06, 16]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
      </group>
      <group ref={sprocketB} position={[-0.34, -0.02, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.06, 16]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
      </group>
      <group ref={group}>
        {Array.from({ length: pads }).map((_, i) => (
          <mesh key={i}>
            <boxGeometry args={[0.07, 0.045, 0.07]} />
            <meshStandardMaterial {...rubber} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Hoses() {
  const geomL = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.22, 0.16, -0.08),
      new THREE.Vector3(-0.05, 0.42, -0.12),
      new THREE.Vector3(0.08, 0.52, -0.06),
      new THREE.Vector3(0.16, 0.38, -0.04),
    ]);
    return new THREE.TubeGeometry(curve, 28, 0.022, 8, false);
  }, []);
  const geomR = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.18, 0.16, 0.08),
      new THREE.Vector3(0.0, 0.44, 0.12),
      new THREE.Vector3(0.12, 0.54, 0.05),
      new THREE.Vector3(0.18, 0.38, 0.04),
    ]);
    return new THREE.TubeGeometry(curve, 28, 0.022, 8, false);
  }, []);

  return (
    <group>
      <mesh geometry={geomL}>
        <meshStandardMaterial color="#111" roughness={0.65} />
      </mesh>
      <mesh geometry={geomR}>
        <meshStandardMaterial color="#111" roughness={0.65} />
      </mesh>
    </group>
  );
}

function Spray() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 80;
    const positions = new Float32Array(n * 3);
    const speeds = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      speeds[i] = 0.4 + ((i * 17) % 80) / 100;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("speed", new THREE.BufferAttribute(speeds, 1));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const spd = ref.current.geometry.attributes.speed.array as Float32Array;
    for (let i = 0; i < spd.length; i++) {
      const i3 = i * 3;
      pos[i3] += delta * spd[i] * 1.4;
      pos[i3 + 1] += delta * (0.15 + (i % 3) * 0.04);
      pos[i3 + 2] += (Math.random() - 0.5) * 0.01;
      if (pos[i3] > 1.1) {
        pos[i3] = 0;
        pos[i3 + 1] = (Math.random() - 0.5) * 0.04;
        pos[i3 + 2] = (Math.random() - 0.5) * 0.04;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#d7ecff" size={0.018} transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

export function GradeXRobot({
  explodeLoop = false,
}: {
  explodeLoop?: boolean;
}) {
  const { pointer } = useThree();
  const root = useRef<THREE.Group>(null);
  const turret = useRef<THREE.Group>(null);
  const trackL = useRef<THREE.Group>(null);
  const trackR = useRef<THREE.Group>(null);
  const barrel = useRef<THREE.Group>(null);
  const hoseGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const explode = explodeLoop ? ((Math.sin(t * 0.35) + 1) / 2) * 0.85 : 0;
    if (turret.current) {
      const aimY = pointer.x * 0.55;
      const aimX = -0.16 - pointer.y * 0.28;
      turret.current.rotation.y += (aimY - turret.current.rotation.y) * 0.08;
      turret.current.rotation.x += (aimX - turret.current.rotation.x) * 0.08;
      turret.current.position.y = 0.22 + explode * 0.7;
    }
    if (trackL.current) trackL.current.position.z = explode * 0.55;
    if (trackR.current) trackR.current.position.z = -explode * 0.55;
    if (barrel.current) barrel.current.position.x = 0.42 + explode * 0.45;
    if (hoseGroup.current) hoseGroup.current.position.y = explode * 0.22;
    if (root.current && explode < 0.05) {
      root.current.position.y = Math.sin(t * 1.6) * 0.008;
    }
  });

  return (
    <group ref={root} dispose={null}>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.78, 0.2, 0.42]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      <group ref={barrel} position={[0.42, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.08, 0.16, 20]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <cylinderGeometry args={[0.045, 0.045, 0.06, 16]} />
          <meshStandardMaterial color="#1c1c1c" metalness={0.7} roughness={0.25} />
        </mesh>
      </group>

      {[-0.09, 0.09].map((z) => (
        <mesh key={z} position={[0.4, 0.015, z]}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshStandardMaterial color="#f4e27a" emissive="#ffe27a" emissiveIntensity={1.6} />
        </mesh>
      ))}
      <mesh position={[0.4, 0.015, 0]}>
        <sphereGeometry args={[0.016, 12, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <pointLight position={[0.5, 0.05, 0]} color="#ffe9a0" intensity={1.6} distance={2.4} />

      <mesh position={[-0.28, 0.14, -0.06]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 12]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      <mesh position={[-0.24, 0.14, 0.06]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 12]} />
        <meshStandardMaterial {...brass} />
      </mesh>

      <group ref={trackL}>
        <Track side={1} />
      </group>
      <group ref={trackR}>
        <Track side={-1} />
      </group>

      <group ref={turret} position={[0.02, 0.22, 0]}>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.22, 0.1, 0.18]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0.02, 0.08, 0]}>
          <boxGeometry args={[0.16, 0.08, 0.2]} />
          <meshStandardMaterial {...steelDark} />
        </mesh>
        {[-0.07, 0.07].map((z) => (
          <group key={z} position={[0.14, 0.1, z]} rotation={[z * 0.15, 0, -0.35]}>
            <mesh>
              <cylinderGeometry args={[0.022, 0.028, 0.18, 12]} />
              <meshStandardMaterial {...steel} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.04, 12]} />
              <meshStandardMaterial {...brass} />
            </mesh>
            <group position={[0, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
              <Spray />
            </group>
          </group>
        ))}
        <mesh position={[0.08, 0.1, 0]}>
          <boxGeometry args={[0.08, 0.05, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      <group ref={hoseGroup}>
        <Hoses />
      </group>

      {[-0.42, 0.42].map((x) =>
        [-0.24, 0.24].map((z) => (
          <mesh key={`${x}${z}`} position={[x, -0.02, z]}>
            <boxGeometry args={[0.04, 0.02, 0.08]} />
            <meshStandardMaterial {...steelDark} />
          </mesh>
        )),
      )}
    </group>
  );
}
