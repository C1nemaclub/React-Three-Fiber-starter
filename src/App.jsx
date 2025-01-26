import {
  OrbitControls,
  shaderMaterial,
  TransformControls,
  useTexture,
} from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import { Color, DoubleSide, MathUtils, Vector3 } from 'three';
import fragmentShader from './shaders/fragmentShader.glsl';
import vertexShader from './shaders/vertexShader.glsl';

// Define the custom shader material
const CustomMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color('#ffffff'),
    uResolution: [window.innerWidth, window.innerHeight],
    uLightPosition: new Vector3(1, 1, 0), // Uniform for light position
    uNoiseTexture: null,
    uNormalTexture: null,
  },
  vertexShader,
  fragmentShader
);

extend({ CustomMaterial });
CustomMaterial.key = MathUtils.generateUUID();

const mapCoordinates = (coords) => {
  const x = coords.x;
  const z = coords.z;
  const y = coords.y;
  return { x, y, z };
};

function App() {
  const [noiseTex, normalTex] = useTexture([
    '/src/assets/textures/noise.png',
    '/src/assets/textures/normal.jpg',
  ]);

  const shaderRef = useRef(); // Reference to the shader material
  const sphereRef = useRef();

  const data = useControls({
    color: {
      value: { r: 255, b: 255, g: 255 },
    },
  });

  // Update uniforms on each frame
  useFrame((state) => {
    if (shaderRef.current && sphereRef.current) {
      shaderRef.current.material.uniforms.uTime.value =
        state.clock.getElapsedTime();

      // Explicitly set the uniform's value to a new Vector3
      const spherePosition = sphereRef.current.object.getWorldPosition(
        sphereRef.current.object.position
      );
      shaderRef.current.material.uniforms.uLightPosition.value =
        mapCoordinates(spherePosition);

      const color = new Color(
        data.color.r / 255,
        data.color.g / 255,
        data.color.b / 255
      );

      shaderRef.current.material.uniforms.uColor.value = color;
      shaderRef.current.material.uniforms.uNoiseTexture.value = noiseTex;
      shaderRef.current.material.uniforms.uNormalTexture.value = normalTex;
    }
  });

  return (
    <>
      {/* Mesh with custom shader material */}
      <mesh ref={shaderRef} rotation-x={Math.PI / 2}>
        <sphereGeometry args={[1, 64, 64]} />
        <customMaterial side={DoubleSide} key={MathUtils.generateUUID()} />
      </mesh>

      {/* Light source controlled by TransformControls */}
      <TransformControls mode='translate' ref={sphereRef} position={[2, 2, 0]}>
        <mesh position={[2, 2, 0]}>
          <boxGeometry args={[2, 64, 64]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      </TransformControls>

      {/* Additional scene components */}
      <ambientLight intensity={0.2} />
      <OrbitControls makeDefault />
      <color args={['black']} attach='background' />
    </>
  );
}

export default App;
