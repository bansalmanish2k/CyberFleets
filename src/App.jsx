import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, ScrollControls, Scroll, Environment, MeshReflectorMaterial } from '@react-three/drei';
import CarModel from './components/CarModel';
import SuvModel from './components/SuvModel';
import HypercarModel from './components/HypercarModel';
import Overlay from './components/Overlay';

function App() {
  const [carColor, setCarColor] = useState('#111111'); // Default Phantom Black
  const [activeModel, setActiveModel] = useState('gt'); // 'gt', 'suv', or 'hypercar'

  return (
    <>
      <div className="fullscreen-canvas">
        <Canvas shadows camera={{ position: [5, 2, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ScrollControls pages={3} damping={0.25}>
              
              {/* Global Lighting & Environment */}
              <color attach="background" args={['#050505']} />
              <Environment preset="city" />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={1} />
              
              <pointLight position={[0, 4, 0]} intensity={2} color="#ffffff" distance={10} />
              <pointLight position={[3, 1, 3]} intensity={1} color={carColor} distance={8} />
              <pointLight position={[-3, 1, -3]} intensity={1} color={carColor} distance={8} />

              {/* Global Showroom Floor */}
              <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <MeshReflectorMaterial
                  blur={[400, 100]}
                  resolution={1024}
                  mixBlur={1}
                  mixStrength={15}
                  roughness={1}
                  depthScale={1.2}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="#151515"
                  metalness={0.6}
                />
              </mesh>

              {/* Conditional 3D Scene Elements */}
              {activeModel === 'gt' && <CarModel carColor={carColor} />}
              {activeModel === 'suv' && <SuvModel carColor={carColor} />}
              {activeModel === 'hypercar' && <HypercarModel carColor={carColor} />}

              {/* HTML Overlay Elements */}
              <Scroll html style={{ width: '100%', height: '100%' }}>
                <Overlay 
                  carColor={carColor} 
                  setCarColor={setCarColor} 
                  activeModel={activeModel} 
                  setActiveModel={setActiveModel} 
                />
              </Scroll>

            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
      
      <Loader 
        containerStyles={{ background: '#050505' }}
        innerStyles={{ width: '300px' }}
        barStyles={{ background: '#ff3366' }}
        dataStyles={{ color: '#fff', fontFamily: 'Outfit' }}
      />
    </>
  );
}

export default App;
