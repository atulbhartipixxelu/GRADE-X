"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GradeXRobot } from "./GradeXRobot";
import { ProductBot } from "./ProductBot";
import { revealDrive, storyDrive } from "@/lib/storyDrive";

export type SceneMode = "hero" | "tech" | "studio" | "story" | "reveal";

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
          <meshStandardMaterial color="#2a4d72" metalness={0.88} roughness={0.28} />
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

function StoryScene() {
  const rig = useRef<THREE.Group>(null);
  const smooth = useRef(0);
  const cam = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    smooth.current += (storyDrive.progress - smooth.current) * 0.075;
    const p = smooth.current;
    if (rig.current) {
      rig.current.position.x = -2.35 + p * 4.55;
      rig.current.position.z = Math.sin(p * Math.PI) * 0.18;
      rig.current.position.y = -0.06 + Math.sin(p * Math.PI * 6) * 0.012;
      rig.current.rotation.y = 1.15 - p * 1.85;
      rig.current.rotation.z = Math.sin(p * Math.PI * 2) * 0.035;
    }
    cam.set(2.85 - p * 1.35, 0.92 - p * 0.28, 4.05 + p * 0.35);
    state.camera.position.lerp(cam, 0.09);
    state.camera.lookAt(rig.current?.position.x ?? 0, 0.12, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#06101c", 8, 18]} />
      <ambientLight intensity={0.32} />
      <hemisphereLight args={["#8eb6e8", "#0b1218", 0.48]} />
      <directionalLight position={[5, 8, 4]} intensity={1.7} color="#f3f7fc" />
      <spotLight
        position={[-3.2, 6, 2.4]}
        intensity={1.55}
        angle={0.46}
        penumbra={0.7}
        color="#4a9ae8"
      />
      <spotLight
        position={[2.4, 1.2, -3]}
        intensity={0.85}
        angle={0.7}
        penumbra={0.8}
        color="#9cc7f2"
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.32, 0]} receiveShadow>
        <circleGeometry args={[3.4, 64]} />
        <meshStandardMaterial color="#08111c" metalness={0.35} roughness={0.78} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.318, 0]}>
        <ringGeometry args={[1.55, 1.58, 64]} />
        <meshBasicMaterial color="#4a9ae8" transparent opacity={0.28} />
      </mesh>
      <group ref={rig} position={[-2.35, -0.06, 0]} scale={2.35}>
        <GradeXRobot />
      </group>
      <ContactShadows position={[0, -0.31, 0]} opacity={0.45} scale={12} blur={2.4} />
    </>
  );
}

function RevealScene() {
  const rig = useRef<THREE.Group>(null);
  const xPos = useRef(-1.45);
  const yaw = useRef(0.5);
  const prevX = useRef(-1.45);
  const slots = useMemo(
    () => [
      { x: -1.45, yaw: 0.5 },
      { x: 1.45, yaw: -0.5 },
      { x: -1.45, yaw: 0.5 },
    ],
    [],
  );

  useFrame((state, delta) => {
    const slot = slots[revealDrive.active ? revealDrive.step : 0];
    const dxTarget = slot.x - xPos.current;
    const turning = Math.abs(dxTarget) > 0.12;
    const faceYaw = turning ? Math.sign(dxTarget) * 1.05 : slot.yaw;

    xPos.current = THREE.MathUtils.damp(xPos.current, slot.x, 2.4, delta);
    yaw.current = THREE.MathUtils.damp(yaw.current, faceYaw, 2.8, delta);

    const traveled = xPos.current - prevX.current;
    prevX.current = xPos.current;
    revealDrive.wheel += traveled * 3.2;

    if (rig.current) {
      rig.current.position.x = xPos.current;
      rig.current.position.y = 0;
      rig.current.scale.setScalar(0.92);
      rig.current.rotation.y = yaw.current;
    }

    state.camera.position.set(0, 0.42, 4.35);
    state.camera.lookAt(0, 0.38, 0);
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <hemisphereLight args={["#ffffff", "#dce6f2", 1]} />
      <directionalLight position={[4.2, 7.5, 5]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-5, 2.8, -2]} intensity={0.45} color="#9dbbe0" />
      <spotLight position={[1.2, 8, 3]} intensity={1.15} angle={0.42} penumbra={1} color="#ffffff" />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.14}
        scale={12}
        blur={2.8}
        color="#1a3358"
      />
      <group ref={rig} position={[-1.45, 0, 0]} scale={0.92} rotation={[0, 0.5, 0]}>
        <ProductBot />
      </group>
    </>
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
    if (mode === "tech") {
      aim.set(3.6 + pointer.x * 0.35, 0.72 + pointer.y * 0.18, 3.35);
      state.camera.position.lerp(aim, 0.045);
      state.camera.lookAt(-0.15, -0.82, 0);
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
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 5, 16]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.35} color="#e8f1fc" />
      <pointLight position={[-3, 2, 2]} intensity={0.7} color="#4d7aaa" />
      <CameraRig mode={mode} />
      <group rotation={[0.12, -0.42, 0.04]} position={[0, 0.15, 0]}>
        <CutawayDuct />
        <CrawlerInDuct />
        <GreaseMist />
      </group>
    </>
  );
}

function StudioScene({ explode = false }: { explode?: boolean }) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
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
        dpr={mode === "reveal" ? 1 : [1, 1.25]}
        frameloop={mode === "reveal" || live ? "always" : "never"}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        onCreated={({ gl }) => {
          if (mode === "reveal") gl.setClearColor(0x000000, 0);
          else if (mode === "story") gl.setClearColor(0x000000, 0);
        }}
        camera={{
          fov: mode === "story" || mode === "reveal" ? 32 : 40,
          position:
            mode === "reveal"
              ? [0, 0.42, 4.35]
              : mode === "story"
                ? [2.85, 0.92, 4.05]
                : [4.2, 0.9, 2.8],
          near: 0.1,
          far: 40,
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        {mode === "reveal" ? null : <AdaptiveDpr pixelated />}
        <Suspense fallback={null}>
          {mode === "hero" ? (
            <StudioScene />
          ) : mode === "studio" ? (
            <StudioScene explode />
          ) : mode === "story" ? (
            <StoryScene />
          ) : mode === "reveal" ? (
            <RevealScene />
          ) : (
            <DuctScene mode={mode} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
