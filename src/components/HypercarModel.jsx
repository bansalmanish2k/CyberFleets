import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useScroll, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function HypercarModel({ themeColor }) {
  const group = useRef();
  const scroll = useScroll();

  // 1. Load the BMW model from the public folder
  const { scene } = useGLTF('/bmw.glb');



  // Cache math objects for performance
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetRot = useMemo(() => new THREE.Euler(), []);
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);



  const KEYFRAMES = useMemo(() => [
    { pos: [0, 0.5, 0], rot: [0, 0.5, 0] }, // 0: Hero
    { pos: [2.5, 0.5, 2.5], rot: [0, Math.PI / 4, 0] }, // 1: Perf (Front)
    { pos: [1.5, 0.4, 1.5], rot: [0, -Math.PI / 4, 0] }, // 2: Design (Side)
    { pos: [1, 0.4, 2], rot: [0, Math.PI, 0] }, // 3: DRS System (Rear)
    { pos: [1.5, 1.5, 1.5], rot: [0, -Math.PI / 4, 0] }, // 4: Ceramic Brakes (Side)
    { pos: [0, -1.4, 2], rot: [Math.PI / 8, 0, 3] }, // 5: Monocoque Chassis (Top)
    { pos: [0, 0.5, 0], rot: [0, 0.5, 0] }  // 6: Matrix Headlights (Front)
  ], []);

  useFrame((state, delta) => {
    if (group.current) {

      // 2. Animate Wheels
      scene.traverse((child) => {

        // Spin the BMW wheels (kept your faster 0.08 speed for the hypercar!)
        if (child.isMesh && child.name.toLowerCase().includes("wheel")) {
          child.rotation.x -= 0.08;
        }
      });

      // 3. Scroll-driven animations
      if (scroll) {
        const offset = scroll.offset; // 0.0 to 1.0 over 7 pages
        const segment = offset * 6;
        const index = Math.floor(segment);
        const progress = segment - index;

        if (index >= 6) {
          targetPos.set(...KEYFRAMES[6].pos);
          targetRot.set(...KEYFRAMES[6].rot);
        } else {
          const k1 = KEYFRAMES[index];
          const k2 = KEYFRAMES[index + 1];
          targetPos.set(
            THREE.MathUtils.lerp(k1.pos[0], k2.pos[0], progress),
            THREE.MathUtils.lerp(k1.pos[1], k2.pos[1], progress),
            THREE.MathUtils.lerp(k1.pos[2], k2.pos[2], progress)
          );
          targetRot.set(
            THREE.MathUtils.lerp(k1.rot[0], k2.rot[0], progress),
            THREE.MathUtils.lerp(k1.rot[1], k2.rot[1], progress),
            THREE.MathUtils.lerp(k1.rot[2], k2.rot[2], progress)
          );
        }

        group.current.position.lerp(targetPos, 0.05);

        targetQuat.setFromEuler(targetRot);
        group.current.quaternion.slerp(targetQuat, 0.05);


      }
    }
  });

  return (
    <Float rotationIntensity={0.05} floatIntensity={0.05} speed={2}>
      <group ref={group} position={[0, -0.4, 0]}>

        {/* Render the BMW */}
        <primitive
          object={scene}
          scale={1.2} // Adjust if the BMW is too big or small compared to the others
          position={[0, 0, 0]}
        />





      </group>
    </Float>
  );
}

// Pre-load the BMW model
useGLTF.preload('/bmw.glb');