"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ── Brand palette ────────────────────────────────────────────────
const BRAND_RED = "#f20c2d";
const DARK_GRAY = "#1a1a1a";
const MID_GRAY = "#333333";
const BLACK = "#0d0d0d";

// ── Junk Truck ───────────────────────────────────────────────────
function JunkTruck() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* ── Cab ─────────────────────────────────────── */}
      <mesh position={[-1.6, 0.7, 0]}>
        <boxGeometry args={[1.4, 1.4, 1.6]} />
        <meshStandardMaterial color={BRAND_RED} roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Windshield accent */}
      <mesh position={[-1.0, 0.85, 0]}>
        <boxGeometry args={[0.08, 0.7, 1.3]} />
        <meshStandardMaterial color={MID_GRAY} roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Roof light bar */}
      <mesh position={[-1.6, 1.45, 0]}>
        <boxGeometry args={[0.4, 0.12, 1.2]} />
        <meshStandardMaterial color={DARK_GRAY} roughness={0.4} metalness={0.5} />
      </mesh>

      {/* ── Cargo bed (open-top box) ────────────────── */}
      {/* Floor */}
      <mesh position={[0.7, 0.05, 0]}>
        <boxGeometry args={[3.2, 0.15, 1.8]} />
        <meshStandardMaterial color={MID_GRAY} roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Left wall */}
      <mesh position={[0.7, 0.65, 0.9]}>
        <boxGeometry args={[3.2, 1.1, 0.1]} />
        <meshStandardMaterial color={BRAND_RED} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Right wall */}
      <mesh position={[0.7, 0.65, -0.9]}>
        <boxGeometry args={[3.2, 1.1, 0.1]} />
        <meshStandardMaterial color={BRAND_RED} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Back wall */}
      <mesh position={[2.3, 0.65, 0]}>
        <boxGeometry args={[0.1, 1.1, 1.8]} />
        <meshStandardMaterial color={BRAND_RED} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Front wall (behind cab) */}
      <mesh position={[-0.85, 0.65, 0]}>
        <boxGeometry args={[0.1, 1.1, 1.8]} />
        <meshStandardMaterial color={DARK_GRAY} roughness={0.6} metalness={0.3} />
      </mesh>

      {/* ── Wheels ──────────────────────────────────── */}
      {[
        [-1.3, -0.15, 1.0],
        [-1.3, -0.15, -1.0],
        [1.5, -0.15, 1.0],
        [1.5, -0.15, -1.0],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Tire */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
            <meshStandardMaterial color={BLACK} roughness={0.9} metalness={0.1} />
          </mesh>
          {/* Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.28, 8]} />
            <meshStandardMaterial color={MID_GRAY} roughness={0.3} metalness={0.7} />
          </mesh>
        </group>
      ))}

      {/* ── Cargo debris inside bed ─────────────────── */}
      <mesh position={[0.3, 0.5, 0.3]} rotation={[0.2, 0.5, 0.1]}>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>
      <mesh position={[1.2, 0.4, -0.3]} rotation={[0.1, -0.3, 0.2]}>
        <boxGeometry args={[0.6, 0.35, 0.4]} />
        <meshStandardMaterial color="#6B6B6B" roughness={0.7} />
      </mesh>
      <mesh position={[1.8, 0.55, 0.2]} rotation={[-0.1, 0.8, 0]}>
        <boxGeometry args={[0.35, 0.5, 0.35]} />
        <meshStandardMaterial color="#5C4033" roughness={0.85} />
      </mesh>
      <mesh position={[0.8, 0.7, 0.1]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#4A4A4A" roughness={0.6} />
      </mesh>
    </group>
  );
}

// ── Floating debris particles ────────────────────────────────────
interface Particle {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  shape: "box" | "sphere";
  color: string;
}

function FloatingDebris() {
  const groupRef = useRef<THREE.Group>(null);

  const particles: Particle[] = useMemo(() => {
    const colors = ["#f20c2d", "#333333", "#555555", "#8B7355", "#5C4033"];
    const items: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6 + 1,
          (Math.random() - 0.5) * 10,
        ],
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ],
        scale: Math.random() * 0.12 + 0.04,
        speed: Math.random() * 0.4 + 0.1,
        shape: Math.random() > 0.5 ? "box" : "sphere",
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      child.rotation.x += delta * p.speed * 0.5;
      child.rotation.z += delta * p.speed * 0.3;
      child.position.y += Math.sin(Date.now() * 0.001 * p.speed + i) * delta * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) =>
        p.shape === "box" ? (
          <mesh key={i} position={p.position} rotation={p.rotation} scale={p.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={p.color} roughness={0.7} />
          </mesh>
        ) : (
          <mesh key={i} position={p.position} rotation={p.rotation} scale={p.scale}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshStandardMaterial color={p.color} roughness={0.7} />
          </mesh>
        ),
      )}
    </group>
  );
}

// ── Auto-rotating wrapper ────────────────────────────────────────
function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <JunkTruck />
      <FloatingDebris />
    </group>
  );
}

// ── Main exported component ──────────────────────────────────────
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [5, 3, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Ambient fill */}
      <ambientLight intensity={0.15} />

      {/* Key light — warm white from above-right */}
      <directionalLight position={[5, 8, 3]} intensity={1.2} color="#ffffff" />

      {/* Red accent lights */}
      <pointLight position={[-3, 2, 2]} intensity={4} color={BRAND_RED} distance={12} decay={2} />
      <pointLight position={[3, 1, -3]} intensity={3} color={BRAND_RED} distance={10} decay={2} />

      {/* Subtle fill from below */}
      <pointLight position={[0, -2, 0]} intensity={1} color="#220408" distance={8} decay={2} />

      <SceneContent />

      {/* Orbit controls — auto-rotate only, no user interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate={false}
      />
    </Canvas>
  );
}
