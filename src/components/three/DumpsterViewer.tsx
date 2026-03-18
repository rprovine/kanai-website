"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

const BRAND_RED = "#f20c2d";
const DARK_GRAY = "#1a1a1a";
const MID_GRAY = "#444444";

interface DumpsterSizeData {
  yards: number;
  label: string;
  scale: [number, number, number];
}

const DUMPSTER_SIZES: DumpsterSizeData[] = [
  { yards: 7, label: "10' x 5' x 3.5'", scale: [0.8, 0.7, 0.6] },
  { yards: 15, label: "14' x 8' x 4'", scale: [1.2, 0.8, 0.8] },
  { yards: 20, label: "16' x 8' x 4.5'", scale: [1.5, 0.9, 0.8] },
  { yards: 25, label: "20' x 8' x 5'", scale: [1.5, 1.2, 0.8] },
  { yards: 30, label: "22' x 8' x 6'", scale: [1.5, 1.6, 0.8] },
];

function Dumpster({ targetScale }: { targetScale: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const currentScale = useRef(new THREE.Vector3(...targetScale));

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = new THREE.Vector3(...targetScale);
    currentScale.current.lerp(target, Math.min(delta * 4, 1));
    groupRef.current.scale.copy(currentScale.current);
  });

  const wallThickness = 0.06;

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.08, 1.4]} />
        <meshStandardMaterial color={DARK_GRAY} roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Left wall */}
      <mesh position={[0, 0.6, 0.7]}>
        <boxGeometry args={[2.4, 1.2, wallThickness]} />
        <meshStandardMaterial color={BRAND_RED} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Right wall */}
      <mesh position={[0, 0.6, -0.7]}>
        <boxGeometry args={[2.4, 1.2, wallThickness]} />
        <meshStandardMaterial color={BRAND_RED} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Back wall */}
      <mesh position={[1.2, 0.6, 0]}>
        <boxGeometry args={[wallThickness, 1.2, 1.4]} />
        <meshStandardMaterial color={BRAND_RED} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Front wall */}
      <mesh position={[-1.2, 0.6, 0]}>
        <boxGeometry args={[wallThickness, 1.2, 1.4]} />
        <meshStandardMaterial color={BRAND_RED} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Top rails */}
      <mesh position={[0, 1.2, 0.7]}>
        <boxGeometry args={[2.5, 0.06, 0.08]} />
        <meshStandardMaterial color={DARK_GRAY} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.2, -0.7]}>
        <boxGeometry args={[2.5, 0.06, 0.08]} />
        <meshStandardMaterial color={DARK_GRAY} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Ribs on walls */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={`rib-l-${i}`} position={[x, 0.6, 0.73]}>
          <boxGeometry args={[0.06, 1.0, 0.04]} />
          <meshStandardMaterial color={DARK_GRAY} roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={`rib-r-${i}`} position={[x, 0.6, -0.73]}>
          <boxGeometry args={[0.06, 1.0, 0.04]} />
          <meshStandardMaterial color={DARK_GRAY} roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
      {/* Lift hooks */}
      <mesh position={[-1.25, 1.0, 0.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
        <meshStandardMaterial color={MID_GRAY} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-1.25, 1.0, -0.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
        <meshStandardMaterial color={MID_GRAY} roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

function SizeLabel({ size }: { size: DumpsterSizeData }) {
  return (
    <Html position={[0, 2.2, 0]} center>
      <div className="pointer-events-none select-none whitespace-nowrap rounded-lg bg-black/70 px-4 py-2 text-center backdrop-blur-sm">
        <p className="text-lg font-bold text-white">{size.yards} Yard Dumpster</p>
        <p className="text-sm text-white/70">{size.label}</p>
      </div>
    </Html>
  );
}

interface DumpsterViewerProps {
  selectedIndex?: number;
}

export function DumpsterViewer({ selectedIndex = 2 }: DumpsterViewerProps) {
  const activeSize = DUMPSTER_SIZES[selectedIndex] ?? DUMPSTER_SIZES[2];

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-gray-950">
      <Canvas
        camera={{ position: [3.5, 2.5, 3.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 8, 4]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-3, 2, 2]} intensity={3} color={BRAND_RED} distance={12} decay={2} />
        <pointLight position={[2, 0, -3]} intensity={2} color="#ff4444" distance={10} decay={2} />

        <Dumpster targetScale={activeSize.scale} />
        <SizeLabel size={activeSize} />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#111111" roughness={1} metalness={0} />
        </mesh>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
