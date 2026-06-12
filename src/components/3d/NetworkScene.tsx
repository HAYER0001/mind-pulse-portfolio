"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

const HELIX_POINTS = 300;
const HELIX_RADIUS = 1.6;
const HELIX_HEIGHT = 8;
const HELIX_TURNS = 3;

function PulseHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < HELIX_POINTS; i++) {
      const t = i / HELIX_POINTS;
      const angle = t * Math.PI * 2 * HELIX_TURNS;
      const y = (t - 0.5) * HELIX_HEIGHT;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * HELIX_RADIUS,
          y,
          Math.sin(angle) * HELIX_RADIUS
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.TubeGeometry(curve, 256, 0.08, 12, false);
  }, []);

  const glowGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < HELIX_POINTS; i++) {
      const t = i / HELIX_POINTS;
      const angle = t * Math.PI * 2 * HELIX_TURNS;
      const y = (t - 0.5) * HELIX_HEIGHT;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * HELIX_RADIUS,
          y,
          Math.sin(angle) * HELIX_RADIUS
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.TubeGeometry(curve, 256, 0.25, 12, false);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.ior = 1.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={groupRef} rotation={[0.3, 0, 0.15]}>
        {/* Main helix tube — glassy iridescent */}
        <mesh ref={meshRef} geometry={geometry}>
          <meshPhysicalMaterial
            color="#4f8ff7"
            metalness={0.1}
            roughness={0.05}
            transmission={0.92}
            thickness={1.5}
            ior={2.0}
            iridescence={1}
            iridescenceIOR={1.3}
            transparent
            opacity={0.85}
            envMapIntensity={1.5}
            depthWrite={false}
          />
        </mesh>

        {/* Outer glow tube */}
        <mesh geometry={glowGeometry}>
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.04}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Core axis glow */}
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, HELIX_HEIGHT * 0.9, 8]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function NetworkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, -2, 4]} intensity={0.3} color="#60a5fa" />
      <PulseHelix />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate
        rotateSpeed={0.25}
        maxPolarAngle={Math.PI / 2 + 0.25}
        minPolarAngle={Math.PI / 2 - 0.25}
        maxAzimuthAngle={0.3}
        minAzimuthAngle={-0.3}
      />
    </Canvas>
  );
}
