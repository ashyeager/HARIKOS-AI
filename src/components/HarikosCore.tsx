import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type CoreVariant = "complete" | "opened" | "deconstructed" | "structured";

type CoreMachineProps = {
  variant: CoreVariant;
  reducedMotion: boolean;
};

const faceData: Array<{
  axis: [number, number, number];
  rotation: [number, number, number];
  markRotation: [number, number, number];
}> = [
  { axis: [0, 0, 1], rotation: [0, 0, 0], markRotation: [0, 0, 0] },
  { axis: [0, 0, -1], rotation: [0, Math.PI, 0], markRotation: [0, 0, 0] },
  { axis: [1, 0, 0], rotation: [0, Math.PI / 2, 0], markRotation: [0, 0, Math.PI / 2] },
  { axis: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0], markRotation: [0, 0, Math.PI / 2] },
  { axis: [0, 1, 0], rotation: [Math.PI / 2, 0, 0], markRotation: [0, 0, 0] },
  { axis: [0, -1, 0], rotation: [-Math.PI / 2, 0, 0], markRotation: [0, 0, 0] },
];

const fragmentData: Array<[number, number, number, number]> = [
  [-2.25, 1.3, -0.2, 0.17],
  [2.1, 0.9, -0.6, 0.12],
  [-1.7, -1.65, 0.4, 0.09],
  [1.9, -1.45, 0.15, 0.13],
  [0.7, 2.05, -0.7, 0.08],
  [-0.65, -2.05, -0.6, 0.07],
];

function MachinePanel({
  axis,
  rotation,
  markRotation,
  separation,
  index,
}: (typeof faceData)[number] & { separation: number; index: number }) {
  const position = axis.map((value) => value * separation) as [number, number, number];

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[1.18, 1.18, 0.2, 2, 2, 1]} />
        <meshPhysicalMaterial
          color={index % 2 === 0 ? "#252725" : "#171918"}
          metalness={0.95}
          roughness={0.22}
          clearcoat={0.65}
          clearcoatRoughness={0.28}
        />
      </mesh>
      <mesh position={[0, 0, 0.111]} rotation={markRotation}>
        <boxGeometry args={[0.72, 0.018, 0.018]} />
        <meshStandardMaterial color="#b88a43" metalness={1} roughness={0.18} emissive="#6c4717" emissiveIntensity={0.18} />
      </mesh>
      {[-0.43, 0.43].flatMap((x) => [-0.43, 0.43].map((y) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.115]}>
          <cylinderGeometry args={[0.035, 0.035, 0.025, 12]} />
          <meshStandardMaterial color="#8d7551" metalness={0.9} roughness={0.3} />
        </mesh>
      )))}
    </group>
  );
}

function CoreMachine({ variant, reducedMotion }: CoreMachineProps) {
  const assemblyRef = useRef<THREE.Group>(null);
  const panelRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  const separation = useMemo(() => ({
    complete: 1.05,
    opened: 1.48,
    deconstructed: 1.82,
    structured: 1.28,
  })[variant], [variant]);

  useFrame((state) => {
    if (!assemblyRef.current || !panelRef.current || !innerRef.current || reducedMotion) return;
    const time = state.clock.elapsedTime;
    const scroll = typeof window === "undefined" ? 0 : window.scrollY / Math.max(document.body.scrollHeight, 1);
    assemblyRef.current.rotation.y = THREE.MathUtils.lerp(
      assemblyRef.current.rotation.y,
      state.pointer.x * 0.22 + time * 0.075 + scroll * 0.7,
      0.035,
    );
    assemblyRef.current.rotation.x = THREE.MathUtils.lerp(
      assemblyRef.current.rotation.x,
      state.pointer.y * -0.15 + Math.sin(time * 0.28) * 0.06,
      0.035,
    );
    panelRef.current.rotation.z = Math.sin(time * 0.18) * 0.035;
    innerRef.current.rotation.y = -time * 0.24;
    innerRef.current.rotation.z = time * 0.09;
  });

  const fragmentScale = variant === "deconstructed" ? 1.2 : variant === "opened" ? 0.8 : 0.55;

  return (
    <group ref={assemblyRef} rotation={[0.18, -0.42, 0.08]}>
      <group ref={panelRef}>
        {faceData.map((face, index) => (
          <MachinePanel key={index} {...face} separation={separation} index={index} />
        ))}
      </group>

      <group ref={innerRef}>
        <mesh scale={variant === "opened" ? 0.94 : 0.82}>
          <icosahedronGeometry args={[0.83, 2]} />
          <meshPhysicalMaterial
            color="#c2944b"
            metalness={0.82}
            roughness={0.16}
            emissive="#8a5619"
            emissiveIntensity={0.32}
            clearcoat={1}
          />
        </mesh>
        <mesh scale={variant === "opened" ? 1.01 : 0.9}>
          <icosahedronGeometry args={[0.83, 2]} />
          <meshBasicMaterial color="#f2c879" wireframe transparent opacity={0.48} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.12, 0.018, 12, 96]} />
          <meshStandardMaterial color="#c9a25f" emissive="#8b581c" emissiveIntensity={0.42} metalness={1} roughness={0.2} />
        </mesh>
        <mesh rotation={[0.6, 0.7, 0]}>
          <torusGeometry args={[1.28, 0.01, 10, 96]} />
          <meshBasicMaterial color="#6c6252" transparent opacity={0.7} />
        </mesh>
      </group>

      {fragmentData.map(([x, y, z, scale], index) => (
        <mesh
          key={index}
          position={[x * fragmentScale, y * fragmentScale, z]}
          rotation={[index * 0.65, index * 0.42, index * 0.28]}
          scale={scale * (variant === "deconstructed" ? 1.35 : 1)}
        >
          {index % 2 === 0 ? <octahedronGeometry args={[1, 0]} /> : <boxGeometry args={[1.4, 0.35, 0.8]} />}
          <meshStandardMaterial
            color={index % 3 === 0 ? "#bb8d48" : "#4a4b47"}
            metalness={0.95}
            roughness={0.22}
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
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 5, 5]} intensity={3.4} color="#fff0cf" />
      <directionalLight position={[-4, -2, 3]} intensity={1.7} color="#87724f" />
      <pointLight position={[0, 0, 1.5]} intensity={7} distance={5} color="#c7812d" />
      <spotLight position={[0, 4, -1]} intensity={4} angle={0.42} penumbra={0.7} color="#dfc59a" />
      <CoreMachine variant={variant} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
