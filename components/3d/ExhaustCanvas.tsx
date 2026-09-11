"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows, Html } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GradeXRobot } from "./GradeXRobot";

export type SceneMode = "hero" | "tech" | "studio";

function CutawayDuct({ length = 12 }: { length?: number }) {
  const rings = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.65, 1.65, length, 48, 1, true, Math.PI * 0.18, Math.PI * 1.64]} />
        <meshStandardMaterial
          color="#243140"
          metalness={0.9}
          roughness={0.32}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.58, 1.58, length, 48, 1, true, Math.PI * 0.18, Math.PI * 1.64]} />
        <meshStandardMaterial
          color="#4a2e18"
          metalness={0.15}
          roughness={0.92}
          side={THREE.BackSide}
          transparent
          opacity={0.5}
        />
      </mesh>
      {rings.map((i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2, 0, 0]}
          position={[-length / 2 + 1 + i * 0.9, 0, 0]}
        >
          <torusGeometry args={[1.66, 0.04, 8, 40, Math.PI * 1.64]} />
          <meshStandardMaterial color="#1e6fd4" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function seed(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function GreaseMist() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 160;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = seed(i) * Math.PI;
      positions[i * 3] = (seed(i + 17) - 0.5) * 10;
      positions[i * 3 + 1] = -0.2 + seed(i + 31) * 0.9;
      positions[i * 3 + 2] = Math.cos(a) * (0.4 + seed(i + 53) * 1.1);
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);
  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += 0.01;
      if (arr[i] > 6) arr[i] = -6;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#4a9ae8" size={0.025} transparent opacity={0.4} />
    </points>
  );
}

function CrawlerInDuct() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.position.x = Math.sin(t * 0.28) * 2.6;
    ref.current.rotation.z = Math.sin(t * 1.5) * 0.03;
  });
  return (
    <group ref={ref} position={[0, -1.12, 0]} scale={1.15}>
      <GradeXRobot />
    </group>
  );
}

function CameraRig({ mode }: { mode: SceneMode }) {
  const { pointer } = useThree();
  const aim = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mode === "hero") {
      aim.set(1.8 + pointer.x * 0.55, 0.95 + pointer.y * 0.25, 2.55);
      state.camera.position.lerp(aim, 0.05);
      state.camera.lookAt(0, 0.1, 0);
      return;
    }
    if (mode === "studio") {
      const r = 2.4;
      aim.set(Math.sin(t * 0.22) * r, 1.15, Math.cos(t * 0.22) * r);
      state.camera.position.lerp(aim, 0.06);
      state.camera.lookAt(0, 0.12, 0);
      return;
    }
    aim.set(3.2, 0.55, 2.1);
    state.camera.position.lerp(aim, 0.05);
    state.camera.lookAt(0.2, -0.55, 0);
  });
  return null;
}

function DuctScene({ mode }: { mode: "hero" | "tech" }) {
  return (
    <>
      <color attach="background" args={["#0a2a5e"]} />
      <fog attach="fog" args={["#0a2a5e", 5, 16]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.35} color="#e8f1fc" />
      <pointLight position={[-3, 2, 2]} intensity={0.7} color="#4d7aaa" />
      <CameraRig mode={mode} />
      <group rotation={[0.12, -0.42, 0.04]} position={[0, 0.15, 0]}>
        <CutawayDuct />
        <CrawlerInDuct />
        <GreaseMist />
      </group>
      {mode === "tech" ? (
        <Html position={[1.6, 1.15, 0]} transform distanceFactor={8}>
          <div className="rounded border border-gold/40 bg-brand/80 px-3 py-2 font-mono text-[10px] tracking-widest text-gold-2 uppercase">
            Tracked crawler · live interior
          </div>
        </Html>
      ) : null}
    </>
  );
}

function StudioScene({ explode = false }: { explode?: boolean }) {
  return (
    <>
      <color attach="background" args={["#0a2a5e"]} />
      <ambientLight intensity={0.85} />
      <spotLight position={[4, 6, 3]} intensity={2.4} angle={0.55} color="#e8f1fc" />
      <directionalLight position={[-3, 4, 2]} intensity={1.1} />
      <CameraRig mode={explode ? "studio" : "hero"} />
      <group scale={explode ? 1.35 : 1.55} position={[0, 0.08, 0]}>
        <GradeXRobot explodeLoop={explode} />
      </group>
      {explode ? (
        <ContactShadows position={[0, -0.28, 0]} opacity={0.22} scale={7} blur={2.8} />
      ) : null}
    </>
  );
}

export function ExhaustCanvas({ mode = "hero" }: { mode?: SceneMode }) {
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
    <div ref={host} className="h-full w-full">
      <Canvas
        dpr={[1, 1.25]}
        frameloop={live ? "always" : "never"}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        camera={{ fov: 40, position: [4.2, 0.9, 2.8], near: 0.1, far: 40 }}
        style={{ width: "100%", height: "100%" }}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          {mode === "hero" ? (
            <StudioScene />
          ) : mode === "studio" ? (
            <StudioScene explode />
          ) : (
            <DuctScene mode={mode} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
