import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function SuvModel({ carColor }) {
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
        
        const targetPos = new THREE.Vector3(0, 0, 0); 
        const targetRot = new THREE.Euler(0, 0.5, 0);

        if (offset < 0.2) {
          targetPos.set(0, 0, 0);
          targetRot.set(0, 0.5, 0);
        } else if (offset < 0.6) {
          const progress = (offset - 0.2) / 0.4;
          targetPos.set(THREE.MathUtils.lerp(0, 2.5, progress), 0, 0);
          targetRot.set(0, THREE.MathUtils.lerp(0.5, -Math.PI / 2, progress), 0);
        } else {
          const progress = (offset - 0.6) / 0.4;
          targetPos.set(THREE.MathUtils.lerp(2.5, -1, progress), 0, THREE.MathUtils.lerp(0, 2, progress));
          targetRot.set(0, THREE.MathUtils.lerp(-Math.PI / 2, -Math.PI + 0.2, progress), 0);
        }

        group.current.position.lerp(targetPos, 0.05);
        
        const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
        group.current.quaternion.slerp(targetQuat, 0.05);
      }
    }
  });

  return (
    <Float rotationIntensity={0.05} floatIntensity={0.1} speed={1}>
      <group ref={group} position={[0, 0, 0]}>
        
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.8, 1.0, 2.4]} />
          <meshPhysicalMaterial 
            name="paint"
            color={carColor} 
            metalness={0.7} 
            roughness={0.3} 
            clearcoat={1} 
          />
        </mesh>
        
        {/* Front Grill - Now painted! */}
        <mesh position={[2.45, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.8, 2.3]} />
          <meshPhysicalMaterial name="paint" color={carColor} metalness={0.8} roughness={0.5} />
        </mesh>

        <mesh position={[-0.2, 1.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.0, 1.5, 0.8, 4]} />
          <meshPhysicalMaterial 
            color="#000" 
            metalness={0.9} 
            roughness={0.1} 
            transmission={0.9} 
            ior={1.5}
            thickness={0.5}
          />
        </mesh>

        <mesh position={[-0.2, 2.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.1, 1.8]} />
          <meshStandardMaterial color="#222" metalness={0.8} />
        </mesh>

        <SuvWheel position={[-1.5, 0.3, 1.3]} />
        <SuvWheel position={[1.5, 0.3, 1.3]} />
        <SuvWheel position={[-1.5, 0.3, -1.3]} />
        <SuvWheel position={[1.5, 0.3, -1.3]} />

        <mesh position={[2.6, 0.8, 0]}>
          <boxGeometry args={[0.05, 0.1, 2.2]} />
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

function SuvWheel({ position }) {
  const wheelGroup = useRef();
  
  useFrame(() => {
    if (wheelGroup.current) {
      wheelGroup.current.rotation.x -= 0.04;
    }
  });

  return (
    <group position={position} ref={wheelGroup}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
        <meshStandardMaterial color="#080808" roughness={1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, position[2] > 0 ? 0.26 : -0.26, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.1, 8]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}
