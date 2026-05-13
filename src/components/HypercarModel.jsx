import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function HypercarModel({ carColor }) {
  const group = useRef();
  const scroll = useScroll();
  
  const targetColor = useRef(new THREE.Color(carColor));

  useEffect(() => {
    targetColor.current.set(carColor);
  }, [carColor]);

  useFrame(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if (child.isMesh && child.material && child.material.name === "paint") {
          child.material.color.lerp(targetColor.current, 0.1);
        }
      });

      if (scroll) {
        const offset = scroll.offset; // 0.0 to 1.0 over 3 pages
        
        const targetPos = new THREE.Vector3(0, -0.4, 0); 
        const targetRot = new THREE.Euler(0, 0.5, 0);

        if (offset < 0.2) {
          targetPos.set(0, -0.4, 0);
          targetRot.set(0, 0.5, 0);
        } else if (offset < 0.6) {
          const progress = (offset - 0.2) / 0.4;
          targetPos.set(THREE.MathUtils.lerp(0, 2, progress), -0.4, 0);
          targetRot.set(0, THREE.MathUtils.lerp(0.5, -Math.PI / 2, progress), 0);
        } else {
          const progress = (offset - 0.6) / 0.4;
          targetPos.set(THREE.MathUtils.lerp(2, -1, progress), -0.4, THREE.MathUtils.lerp(0, 2, progress));
          targetRot.set(0, THREE.MathUtils.lerp(-Math.PI / 2, -Math.PI + 0.2, progress), 0);
        }

        group.current.position.lerp(targetPos, 0.05);
        
        const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
        group.current.quaternion.slerp(targetQuat, 0.05);
      }
    }
  });

  return (
    <Float rotationIntensity={0.05} floatIntensity={0.05} speed={2}>
      <group ref={group} position={[0, -0.4, 0]}>
        
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.0, 0.3, 2.2]} />
          <meshPhysicalMaterial 
            name="paint"
            color={carColor} 
            metalness={0.9} 
            roughness={0.1} 
            clearcoat={1} 
          />
        </mesh>
        
        <mesh position={[2.6, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.1, 2.3]} />
          <meshStandardMaterial color="#050505" roughness={0.8} />
        </mesh>

        <mesh position={[-0.5, 0.65, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial 
            color="#000" 
            metalness={0.9} 
            roughness={0.0} 
            transmission={0.9} 
            ior={1.6}
            thickness={0.5}
          />
        </mesh>

        <mesh position={[-2.2, 0.6, 0.6]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.6, 0.05]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        <mesh position={[-2.2, 0.6, -0.6]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.6, 0.05]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        
        {/* Rear Wing - Now painted! */}
        <mesh position={[-2.3, 0.9, 0]} rotation={[0, 0, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.05, 2.6]} />
          <meshPhysicalMaterial name="paint" color={carColor} metalness={0.8} />
        </mesh>

        <HyperWheel position={[-1.6, 0.2, 1.2]} />
        <HyperWheel position={[1.6, 0.2, 1.2]} />
        <HyperWheel position={[-1.6, 0.2, -1.2]} />
        <HyperWheel position={[1.6, 0.2, -1.2]} />

        <mesh position={[2.5, 0.35, 0.8]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.1, 0.05, 0.4]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
        <mesh position={[2.5, 0.35, -0.8]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.1, 0.05, 0.4]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>

        <mesh position={[0, 0.1, 0]}>
          <planeGeometry args={[4, 2]} />
          <meshBasicMaterial name="paint" color={carColor} toneMapped={false} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>

      </group>
    </Float>
  );
}

function HyperWheel({ position }) {
  const wheelGroup = useRef();
  
  useFrame(() => {
    if (wheelGroup.current) {
      wheelGroup.current.rotation.x -= 0.08; 
    }
  });

  return (
    <group position={position} ref={wheelGroup}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, position[2] > 0 ? 0.21 : -0.21, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.05, 12]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}
