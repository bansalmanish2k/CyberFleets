import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function CarModel({ carColor }) {
  const group = useRef();
  const scroll = useScroll();
  
  const targetColor = useRef(new THREE.Color(carColor));

  useEffect(() => {
    targetColor.current.set(carColor);
  }, [carColor]);

  useFrame((state, delta) => {
    if (group.current) {
      // 1. Smoothly interpolate all paint materials
      group.current.traverse((child) => {
        if (child.isMesh && child.material && child.material.name === "paint") {
          child.material.color.lerp(targetColor.current, 0.1);
        }
      });

      // 2. Scroll-driven animations
      if (scroll) {
        const offset = scroll.offset; // 0.0 to 1.0 over 3 pages
        
        const targetPos = new THREE.Vector3(0, -0.2, 0);
        const targetRot = new THREE.Euler(0, 0.5, 0); 

        if (offset < 0.2) {
          targetPos.set(0, -0.2, 0);
          targetRot.set(0, 0.5, 0);
        } else if (offset < 0.6) {
          const progress = (offset - 0.2) / 0.4; 
          targetPos.set(THREE.MathUtils.lerp(0, 2, progress), -0.2, 0);
          targetRot.set(0, THREE.MathUtils.lerp(0.5, -Math.PI / 2, progress), 0);
        } else {
          const progress = (offset - 0.6) / 0.4;
          targetPos.set(THREE.MathUtils.lerp(2, -1, progress), -0.2, THREE.MathUtils.lerp(0, 2, progress));
          targetRot.set(0, THREE.MathUtils.lerp(-Math.PI / 2, -Math.PI + 0.2, progress), 0);
        }

        group.current.position.lerp(targetPos, 0.05);
        
        const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
        group.current.quaternion.slerp(targetQuat, 0.05);
      }
    }
  });

  return (
    <Float rotationIntensity={0.1} floatIntensity={0.2} speed={1.5}>
      <group ref={group} position={[0, -0.2, 0]}>
        
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.4, 0.6, 2]} />
          <meshPhysicalMaterial 
            name="paint"
            color={carColor} 
            metalness={0.8} 
            roughness={0.2} 
            clearcoat={1} 
            clearcoatRoughness={0.1}
          />
        </mesh>
        
        <mesh position={[2.2, 0.4, 0]} rotation={[0, 0, Math.PI / 12]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.4, 1.9]} />
          <meshPhysicalMaterial name="paint" color={carColor} metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[-0.4, 1.05, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 1.2, 0.6, 4]} />
          <meshPhysicalMaterial 
            color="#000" 
            metalness={0.9} 
            roughness={0.1} 
            transmission={0.9} 
            ior={1.5}
            thickness={0.5}
          />
        </mesh>

        <mesh position={[-2.2, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.3, 1.8]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
        </mesh>

        <Wheel position={[-1.4, 0.2, 1.1]} />
        <Wheel position={[1.4, 0.2, 1.1]} />
        <Wheel position={[-1.4, 0.2, -1.1]} />
        <Wheel position={[1.4, 0.2, -1.1]} />

        <mesh position={[2.7, 0.55, 0]}>
          <boxGeometry args={[0.05, 0.05, 1.8]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>

        <mesh position={[-2.25, 0.55, 0]}>
          <boxGeometry args={[0.05, 0.05, 1.8]} />
          <meshBasicMaterial color="#ff0000" toneMapped={false} />
        </mesh>

        <mesh position={[0, 0.1, 0]}>
          <planeGeometry args={[4, 1.8]} />
          <meshBasicMaterial name="paint" color={carColor} toneMapped={false} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>

      </group>
    </Float>
  );
}

function Wheel({ position }) {
  const wheelGroup = useRef();
  
  useFrame(() => {
    if (wheelGroup.current) {
      wheelGroup.current.rotation.x -= 0.05;
    }
  });

  return (
    <group position={position} ref={wheelGroup}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
        <meshStandardMaterial color="#080808" roughness={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, position[2] > 0 ? 0.18 : -0.18, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 6]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}
