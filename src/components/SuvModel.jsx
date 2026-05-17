import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useScroll, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function SuvModel({ themeColor }) {
  const group = useRef();
  const scroll = useScroll();

  // 1. Load the Lamborghini from the public folder
  const { scene } = useGLTF('/lambo.glb');






  // Cache math objects for high performance
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetRot = useMemo(() => new THREE.Euler(), []);
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);

  const KEYFRAMES = useMemo(() => [
    { pos: [2.5, -0.2, 1.5], rot: [0, Math.PI / 1, 0] }, // 0: Hero
    { pos: [2.5, 0, 2.5], rot: [0, Math.PI / 4, 0] }, // 1: Perf (Front)
    { pos: [1.5, 0, 1.5], rot: [0, -Math.PI / 4, 0] }, // 2: Design (Side)
    { pos: [1.8, 0, 1], rot: [0, -Math.PI / 2, 0] }, // 3: All-Terrain Drive (Side)
    { pos: [1.5, 0, 1.5], rot: [0, -Math.PI / 4, 0] }, // 4: Armored Panels (Side)
    { pos: [0, -1, 2], rot: [Math.PI / 8, Math.PI / 4, 0] }, // 5: Utility Roof Rack (Top)
    { pos: [2, -0.2, 1.5], rot: [0, Math.PI / 2, 0] }  // 6: LED Light Bar (Front)
  ], []);

  useFrame((state, delta) => {
    if (group.current) {

      let shouldSpin = false;
      let segment = 0;
      let index = 0;
      let progress = 0;

      if (scroll) {
        const offset = scroll.offset; // 0.0 to 1.0 over 7 pages
        segment = offset * 6;
        index = Math.floor(segment);
        progress = segment - index;

        const currentSection = Math.round(segment);
        // 3: All-Terrain Drive
        if (currentSection === 3) {
          shouldSpin = true;
        }
      }



      // 3. Scroll-driven animations
      if (scroll) {
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
    <Float rotationIntensity={0.05} floatIntensity={0.1} speed={1}>
      <group ref={group} position={[0, 0, 0]}>

        {/* Render the Lambo */}
        <primitive
          object={scene}
          scale={1.4} // Adjust this up or down if the Lambo is the wrong size!
          position={[0, 0, 0]}
        />





      </group>
    </Float>
  );
}

// Pre-load the model
useGLTF.preload('/lambo.glb');