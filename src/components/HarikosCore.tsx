import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export type CoreVariant = "complete" | "opened" | "deconstructed" | "structured";

type CoreMachineProps = {
  variant: CoreVariant;
  reducedMotion: boolean;
};

const variantSettings = {
  complete: { cageScale: 1, coreScale: 0.92, fragmentScale: 0.5 },
  opened: { cageScale: 1.14, coreScale: 0.86, fragmentScale: 0.82 },
  deconstructed: { cageScale: 1.28, coreScale: 0.78, fragmentScale: 1.2 },
  structured: { cageScale: 1.08, coreScale: 0.9, fragmentScale: 0.7 },
} satisfies Record<CoreVariant, { cageScale: number; coreScale: number; fragmentScale: number }>;

const orbitalArcs: Array<{
  radius: number;
  tube: number;
  rotation: [number, number, number];
  position: [number, number, number];
  arc: number;
  color: string;
  opacity: number;
}> = [
  { radius: 1.68, tube: 0.025, rotation: [Math.PI / 2, 0.1, 0.18], position: [0, 0, 0], arc: Math.PI * 1.45, color: "#b88a43", opacity: 0.9 },
  { radius: 1.86, tube: 0.012, rotation: [0.58, 0.72, 0.22], position: [0, 0, 0], arc: Math.PI * 1.2, color: "#7f7666", opacity: 0.72 },
  { radius: 2.05, tube: 0.016, rotation: [1.08, -0.35, 0.62], position: [0, 0, -0.08], arc: Math.PI * 0.82, color: "#c39a58", opacity: 0.65 },
  { radius: 1.48, tube: 0.009, rotation: [0.2, 1.1, -0.45], position: [0, 0, 0.1], arc: Math.PI * 1.7, color: "#d6b471", opacity: 0.58 },
];

const fragmentData: Array<[number, number, number, number, "octa" | "tetra" | "pin"]> = [
  [-2.25, 1.3, -0.2, 0.17, "octa"],
  [2.1, 0.9, -0.6, 0.12, "tetra"],
  [-1.7, -1.65, 0.4, 0.09, "pin"],
  [1.9, -1.45, 0.15, 0.13, "octa"],
  [0.7, 2.05, -0.7, 0.08, "tetra"],
  [-0.65, -2.05, -0.6, 0.07, "pin"],
];

function OrbitalCage({ scale }: { scale: number }) {
  return (
    <group scale={scale}>
      {orbitalArcs.map((arc, index) => (
        <mesh key={index} rotation={arc.rotation} position={arc.position}>
          <torusGeometry args={[arc.radius, arc.tube, 10, 144, arc.arc]} />
          <meshStandardMaterial
            color={arc.color}
            metalness={0.96}
            roughness={0.18}
            transparent
            opacity={arc.opacity}
          />
        </mesh>
      ))}

      <mesh rotation={[0.32, -0.38, 0.15]}>
        <torusKnotGeometry args={[1.34, 0.012, 180, 8, 2, 3]} />
        <meshStandardMaterial
          color="#8f7650"
          emissive="#523311"
          emissiveIntensity={0.18}
          metalness={0.95}
          roughness={0.22}
          transparent
          opacity={0.58}
        />
      </mesh>

      <mesh rotation={[0, 0, -0.52]} position={[0, 0, -0.12]}>
        <ringGeometry args={[1.96, 2, 128, 1, 0.18, Math.PI * 0.42]} />
        <meshBasicMaterial color="#6e675b" transparent opacity={0.48} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[0, 0, 2.64]} position={[0, 0, 0.05]}>
        <ringGeometry args={[1.78, 1.815, 128, 1, 0.12, Math.PI * 0.36]} />
        <meshBasicMaterial color="#c89d59" transparent opacity={0.72} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function InnerEngine({ scale }: { scale: number }) {
  return (
    <group scale={scale}>
      <mesh>
        <dodecahedronGeometry args={[0.92, 1]} />
        <meshPhysicalMaterial
          color="#aa7939"
          metalness={0.78}
          roughness={0.18}
          emissive="#6b3e0f"
          emissiveIntensity={0.28}
          clearcoat={1}
          transparent
          opacity={0.5}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh scale={1.06}>
        <dodecahedronGeometry args={[0.92, 1]} />
        <meshBasicMaterial color="#f0ca83" wireframe transparent opacity={0.66} />
      </mesh>
      <mesh rotation={[0.45, 0.25, 0.72]} scale={0.46}>
        <octahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#efc676"
          emissive="#d68022"
          emissiveIntensity={1.2}
          metalness={0.65}
          roughness={0.12}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.018, 10, 112]} />
        <meshStandardMaterial color="#d4aa66" emissive="#8b581c" emissiveIntensity={0.5} metalness={1} roughness={0.2} />
      </mesh>
      <mesh rotation={[0.6, 0.7, 0]}>
        <torusGeometry args={[1.28, 0.009, 8, 112]} />
        <meshBasicMaterial color="#8e8577" transparent opacity={0.68} />
      </mesh>
    </group>
  );
}

function CoreMachine({ variant, reducedMotion }: CoreMachineProps) {
  const assemblyRef = useRef<THREE.Group>(null);
  const cageRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const settings = variantSettings[variant];

  useFrame((state) => {
    if (!assemblyRef.current || !cageRef.current || !innerRef.current || reducedMotion) return;
    const time = state.clock.elapsedTime;
    const scroll = typeof window === "undefined" ? 0 : window.scrollY / Math.max(document.body.scrollHeight, 1);
    assemblyRef.current.rotation.y = THREE.MathUtils.lerp(
      assemblyRef.current.rotation.y,
      state.pointer.x * 0.24 + time * 0.07 + scroll * 0.72,
      0.035,
    );
    assemblyRef.current.rotation.x = THREE.MathUtils.lerp(
      assemblyRef.current.rotation.x,
      state.pointer.y * -0.16 + Math.sin(time * 0.3) * 0.055,
      0.035,
    );
    cageRef.current.rotation.z = time * 0.045 + Math.sin(time * 0.22) * 0.035;
    cageRef.current.rotation.x = Math.sin(time * 0.17) * 0.04;
    innerRef.current.rotation.y = -time * 0.22;
    innerRef.current.rotation.z = time * 0.11;
  });

  return (
    <group ref={assemblyRef} rotation={[0.16, -0.38, 0.08]}>
      <group ref={cageRef}>
        <OrbitalCage scale={settings.cageScale} />
      </group>

      <group ref={innerRef}>
        <InnerEngine scale={settings.coreScale} />
      </group>

      {fragmentData.map(([x, y, z, scale, shape], index) => (
        <mesh
          key={index}
          position={[x * settings.fragmentScale, y * settings.fragmentScale, z]}
          rotation={[index * 0.65, index * 0.42, index * 0.28]}
          scale={scale * (variant === "deconstructed" ? 1.25 : 1)}
        >
          {shape === "octa" ? <octahedronGeometry args={[1, 0]} /> : shape === "tetra" ? <tetrahedronGeometry args={[1, 0]} /> : <cylinderGeometry args={[0.22, 0.22, 1.8, 8]} />}
          <meshStandardMaterial
            color={index % 3 === 0 ? "#c09350" : "#696a64"}
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

type HarikosCoreProps = {
  variant?: CoreVariant;
  reducedMotion?: boolean;
};

export default function HarikosCore({ variant = "complete", reducedMotion = false }: HarikosCoreProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.4], fov: 36 }}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 5]} intensity={2.8} color="#fff0cf" />
      <directionalLight position={[-4, -2, 3]} intensity={1.5} color="#87724f" />
      <pointLight position={[0, 0, 1.5]} intensity={6.5} distance={5} color="#c7812d" />
      <spotLight position={[0, 4, -1]} intensity={3.2} angle={0.42} penumbra={0.7} color="#dfc59a" />
      <CoreMachine variant={variant} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
