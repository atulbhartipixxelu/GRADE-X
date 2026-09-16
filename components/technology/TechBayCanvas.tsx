"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GradeXRobot } from "@/components/3d/GradeXRobot";
import { techPlates } from "./techPlates";

function slot(i: number, active: number) {
  if (i === active) return { p: [0, 0.42, 1.35] as const, r: 0, s: 1.18 };
  const others = [0, 1, 2].filter((n) => n !== active);
  const side = others.indexOf(i) === 0 ? -1 : 1;
  return { p: [side * 2.35, 0.22, -0.15] as const, r: -side * 0.48, s: 0.82 };
}

function Plate({
  src,
  index,
  active,
  onPick,
}: {
  src: string;
  index: number;
  active: number;
  onPick: (i: number) => void;
}) {
  const texture = useTexture(src);
  texture.colorSpace = THREE.SRGBColorSpace;
  const group = useRef<THREE.Group>(null);
  const target = useMemo(() => slot(index, active), [index, active]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const bob = Math.sin(state.clock.elapsedTime * 1.15 + index * 1.4) * 0.05;
    g.position.x += (target.p[0] - g.position.x) * 0.08;
    g.position.y += (target.p[1] + bob - g.position.y) * 0.08;
    g.position.z += (target.p[2] - g.position.z) * 0.08;
    g.rotation.y += (target.r - g.rotation.y) * 0.08;
    const s = g.scale.x + (target.s - g.scale.x) * 0.08;
    g.scale.setScalar(s);
  });

  return (
    <group ref={group} position={[target.p[0], target.p[1], target.p[2]]} rotation={[0, target.r, 0]} scale={target.s}>
      <mesh
        position={[0, 0, -0.025]}
        onClick={(event) => {
          event.stopPropagation();
          onPick(index);
        }}
      >
        <planeGeometry args={[2.42, 1.72]} />
        <meshStandardMaterial color="#c9a44a" metalness={0.85} roughness={0.28} />
      </mesh>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onPick(index);
        }}
      >
        <planeGeometry args={[2.28, 1.58]} />
        <meshStandardMaterial map={texture} roughness={0.55} metalness={0.08} />
      </mesh>
    </group>
  );
}

function SpinCrawler() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.28;
  });
  return (
    <group ref={ref} position={[0, -0.92, -1.2]} rotation={[0.1, 0, 0]} scale={1.08}>
      <GradeXRobot />
    </group>
  );
}

function Rig({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  const rig = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const g = rig.current;
    if (!g) return;
    g.rotation.y += (mouse.current.x * 0.28 - g.rotation.y) * 0.045;
    g.rotation.x += (-mouse.current.y * 0.1 + 0.08 - g.rotation.x) * 0.045;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.04;
  });

  return (
    <group ref={rig}>
      <SpinCrawler />
      {techPlates.map((plate, i) => (
        <Plate key={plate.src} src={plate.src} index={i} active={active} onPick={onPick} />
      ))}
      <ContactShadows position={[0, -1.15, 0]} opacity={0.38} scale={12} blur={2.6} />
    </group>
  );
}

export function TechBayCanvas({
  active,
  onPick,
}: {
  active: number;
  onPick: (i: number) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(true);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setLive(Boolean(entry?.isIntersecting)),
      { rootMargin: "80px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="gx-tech-bay-canvas">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={live ? "always" : "never"}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        camera={{ fov: 38, position: [0, 0.55, 6.2], near: 0.1, far: 40 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <color attach="background" args={["#050b14"]} />
        <fog attach="fog" args={["#050b14", 8, 18]} />
        <ambientLight intensity={0.55} />
        <spotLight position={[4, 6, 5]} intensity={2.2} angle={0.5} color="#f3eee4" />
        <pointLight position={[-3, 2, 3]} intensity={1.1} color="#c9a44a" />
        <directionalLight position={[2, 3, 4]} intensity={0.85} />
        <Suspense fallback={null}>
          <Rig active={active} onPick={onPick} />
        </Suspense>
      </Canvas>
    </div>
  );
}
