import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { OrbitControls, Float } from '@react-three/drei';

const RotatingTorus = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
};

const FloatingTorus = () => {
  return (
    <div className="w-32 h-32 md:w-48 md:h-48">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <RotatingTorus />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={2.5}
        />
      </Canvas>
    </div>
  );
};

export default FloatingTorus;
