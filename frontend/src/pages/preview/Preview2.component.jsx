import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import url from '../../assests/models/sportcar2.glb';

function Model() {
  const gltf = useLoader(GLTFLoader, url);
  return gltf ? <primitive object={gltf.scene} castShadow /> : null;
}

const model = () => {
  return (
    <Canvas shadowMap camera={{ position: [301, 326, 303] }}>
      <ambientLight />

      <spotLight castShadow position={[2, 5, 2]} angle={0.5} distance={20} />
      <OrbitControls autoRotate={true} />
      {/* <Plane /> */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
};
export default model;
