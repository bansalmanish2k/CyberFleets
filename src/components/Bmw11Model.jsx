import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useScroll, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export default function Bmw11Model({ themeColor }) {
  const group = useRef();
  const scroll = useScroll();

  // 1. Load the BMW 11 Concept model and its animations
  const { scene, animations } = useGLTF('/bmw11.glb');
  const { actions } = useAnimations(animations, group);

  // Cache math objects for performance
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetRot = useMemo(() => new THREE.Euler(), []);
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);

  const KEYFRAMES = useMemo(() => [
    { pos: [0, -0.5, 0], rot: [0, 0.5, 0] }, // 0: Hero
    { pos: [2.5, 0, 2.5], rot: [0, Math.PI / 4, 0] }, // 1: Perf (Front)
    { pos: [1.5, -0.4, 1.5], rot: [0, -Math.PI / 4, 0] }, // 2: Design (Side)
    { pos: [1.5, -0.5, 1.5], rot: [0, -Math.PI / 2, 0] }, // 3: Butterfly Doors (Side view)
    { pos: [1.5, 0, 1.5], rot: [0, -Math.PI / 4, 0] }, // 4: Aerodynamics
    { pos: [0, -1.4, 2], rot: [Math.PI / 8, 0, 3] }, // 5: Chassis
    { pos: [1, 0, 0], rot: [0, 0.5, 0] }  // 6: Laser Lights
  ], []);

  useFrame((state, delta) => {
    if (group.current) {
      let currentSection = 0;
      let progress = 0;
      let index = 0;

      // 2. Scroll-driven animations
      if (scroll) {
        const offset = scroll.offset; // 0.0 to 1.0 over 7 pages
        const segment = offset * 6;
        index = Math.floor(segment);
        progress = segment - index;
        currentSection = Math.round(segment);

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

      // 3. Animate the Doors!
      if (actions && actions['explode']) {
        const action = actions['explode'];
        action.play();
        action.paused = true; // We control the time manually

        if (currentSection === 3 || currentSection === 4) {
          // Open doors smoothly and keep them open (the 'explode' clip closes them later, so we stop at 1.0s)
          const targetTime = 1.0;
          action.time = THREE.MathUtils.lerp(action.time, targetTime, 0.05);
        } else {
          // Close doors smoothly
          action.time = THREE.MathUtils.lerp(action.time, 0, 0.05);
        }
      }
    }
  });

  return (
    <Float rotationIntensity={0.05} floatIntensity={0.05} speed={2}>
      <group ref={group} position={[0, -0.7, 0]}>
        {/* Render the BMW 11 Concept */}
        <primitive
          object={scene}
          scale={1.0} // Zoomed out a bit
          position={[0, 0, 0]}
        />
      </group>
    </Float>
  );
}

// Pre-load the BMW 11 model
useGLTF.preload('/bmw11.glb');
