import { Environment, Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function GlassForm() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !coreRef.current || !ringRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.22;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.24;
    coreRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.07 + 0.05;
    coreRef.current.rotation.z = state.clock.elapsedTime * 0.16;
    ringRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    ringRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.45} rotationIntensity={0.55} floatIntensity={0.95}>
        <mesh ref={coreRef} scale={1.24}>
          <sphereGeometry args={[1.05, 72, 72]} />
          <meshPhysicalMaterial
            color="#f8ca77"
            roughness={0.12}
            transmission={0.92}
            thickness={0.9}
            ior={1.29}
            clearcoat={1}
            sheen={0.5}
            transparent
            opacity={0.86}
          />
        </mesh>
      </Float>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0.2, 0]}>
        <torusGeometry args={[1.65, 0.01, 16, 180]} />
        <meshBasicMaterial color="#f6d087" transparent opacity={0.75} />
      </mesh>
      <mesh rotation={[0.75, 0.95, 0.2]}>
        <torusGeometry args={[2.15, 0.012, 12, 160]} />
        <meshBasicMaterial color="#9ddbff" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-1.45, 0.65, -0.4]} scale={0.62}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#74c6ff" roughness={0.16} transmission={0.78} thickness={0.5} transparent opacity={0.82} />
      </mesh>
      <mesh position={[1.3, -0.8, -0.2]} scale={0.45}>
        <torusKnotGeometry args={[0.7, 0.18, 96, 16]} />
        <meshPhysicalMaterial color="#d4b2ff" roughness={0.15} transmission={0.72} thickness={0.45} transparent opacity={0.74} />
      </mesh>
    </group>
  );
}

export default function PremiumScene() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(229,169,60,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(64,196,255,0.2),transparent_35%),rgba(7,7,10,0.94)] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:h-[430px]" role="img" aria-label="Abstract interactive glass sphere representing HARIKOS products and systems">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_50%)]" />
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.4], fov: 42 }} className="h-full w-full">
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[3.2, 2.4, 3]} intensity={1.2} color="#ffd49d" />
        <pointLight position={[-2.8, 1.2, 2.2]} intensity={2.8} color="#7dcdf7" />
        <spotLight position={[0, 3.2, 3.2]} intensity={1.5} angle={0.42} penumbra={0.7} color="#ffffff" />
        <Environment preset="city" />
        <GlassForm />
        <Sparkles count={180} scale={3.2} size={2.5} speed={0.35} opacity={0.6} color="#f3cf8c" />
      </Canvas>
    </div>
  );
}
