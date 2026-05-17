import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useScroll, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function CarModel({ themeColor }) {
  const group = useRef();
  const scroll = useScroll();

  // Load the GLB from the public folder
  const { scene } = useGLTF('/rolls-royce_ghost.glb');





  // Cache math objects to maintain high frame rates (60fps+)
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetRot = useMemo(() => new THREE.Euler(), []);
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);



  const KEYFRAMES = useMemo(() => [
    { pos: [0, -0.2, 0], rot: [0, 0.5, 0] }, // 0: Hero
    { pos: [2.5, -0.2, 2.5], rot: [0, Math.PI / 4, 0] }, // 1: Perf (Front)
    { pos: [1.5, -0.2, 1.5], rot: [0, -Math.PI / 4, 0] }, // 2: Design (Side)
    { pos: [1.5, 1, 2.2], rot: [0, -Math.PI / 2, 0] }, // 3: Feature 1 (Aero Wheels)
    { pos: [1, -0.2, 1], rot: [0, Math.PI / 4, 0] }, // 4: Feature 2 (Laser Headlights)
    { pos: [2.5, -0.2, 2.5], rot: [0, Math.PI / 4, 0] }, // 5: Feature 3 (Carbon Splitter)
    { pos: [3.5, 0.5, 1.5], rot: [0, -Math.PI / 4, 0] }  // 6: Feature 4 (Active Suspension)
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
        // 3: Aero Wheels, 6: Active Suspension
        if (currentSection === 3 || currentSection === 6) {
          shouldSpin = true;
        }
      }

      // 1. Model Animations (Wheels)
      scene.traverse((child) => {
        // Spin the wheels if they contain "wheel" in their name
        if (child.name.toLowerCase().includes("wheel")) {
          // Check if any parent also has "wheel" in its name to avoid double-rotation
          let isNestedWheel = false;
          let parent = child.parent;
          while (parent) {
            if (parent.name.toLowerCase().includes("wheel")) {
              isNestedWheel = true;
              break;
            }
            parent = parent.parent;
          }

          if (!isNestedWheel && shouldSpin) {
            child.rotation.x -= 0.05;
          }
        }
      });

      // 2. Scroll-Driven Position & Rotation
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
    <Float rotationIntensity={0.1} floatIntensity={0.2} speed={1.5}>
      <group ref={group} position={[0, -0.2, 0]}>

        {/* Render the Rolls-Royce */}
        <primitive
          object={scene}
          scale={1.3} // Adjust this (e.g., 0.5 or 2) if the car is too big or small
          position={[0, 0, 0]}
        />



      </group>
    </Float>
  );
}

// Pre-load the model to prevent flickering when the component mounts
useGLTF.preload('/rolls-royce_ghost.glb');