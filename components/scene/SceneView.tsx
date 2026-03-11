'use client';

import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Text } from '@react-three/drei';
import type { AgentState } from '@/lib/types';

function AgentAvatar({
  state,
  selected,
  onSelect
}: {
  state: AgentState;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, 0.4, 0]} onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}>
        <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1.02, 48]} />
          <meshBasicMaterial color={selected ? '#22d3ee' : '#334155'} />
        </mesh>
        <mesh castShadow>
          <capsuleGeometry args={[0.5, 1.1, 8, 16]} />
          <meshStandardMaterial color={selected ? '#22d3ee' : '#38bdf8'} metalness={0.25} roughness={0.2} emissive={selected ? '#0f766e' : '#000000'} emissiveIntensity={selected ? 0.35 : 0} />
        </mesh>
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <Text position={[0, 2, 0]} fontSize={0.18} color="#e6eef8" anchorX="center" anchorY="middle">
          Andy · {state}
        </Text>
      </group>
    </Float>
  );
}

function Room() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 3.5, -5]}>
        <boxGeometry args={[12, 7, 0.2]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 6, 0.2]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>
      <mesh position={[2.8, -0.2, -1.4]} castShadow>
        <boxGeometry args={[2.2, 0.2, 1.2]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

export function SceneView({
  state,
  selected,
  onSelect,
  onBackgroundSelect
}: {
  state: AgentState;
  selected: boolean;
  onSelect: () => void;
  onBackgroundSelect: () => void;
}) {
  return (
    <Canvas shadows camera={{ position: [4.2, 2.8, 5.8], fov: 42 }} onPointerMissed={onBackgroundSelect}>
      <color attach="background" args={['#07111f']} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 3]} intensity={1.8} castShadow />
      <pointLight position={[-3, 3, 2]} intensity={16} color="#2563eb" />
      <pointLight position={[3, 2, -2]} intensity={10} color="#22d3ee" />
      <Room />
      <AgentAvatar state={state} selected={selected} onSelect={onSelect} />
      <OrbitControls enablePan={false} minDistance={4} maxDistance={8} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}
