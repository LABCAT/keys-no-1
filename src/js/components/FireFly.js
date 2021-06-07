import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import colorToVec4 from 'color-to-vec4';
import { useFrame } from '@react-three/fiber'
import '../shaders/FireFlyMaterial'

//https://codesandbox.io/s/threejs-journey-ni6v4?file=/src/App.js:173-219
export default function Fireflies(props) {
  const shader = useRef();
  const { size, colour } = props;
  const vec4Colour = colorToVec4(colour);
  const count = 1;
  const [positionArray, scaleArray] = useMemo(() => {
    const positionArray = new Float32Array(62 * 3)
    const scaleArray = new Float32Array(62)
    for (let i = 0; i < count; i++) {
      new THREE.Vector3((Math.random() - 0.5) * 4, Math.random() * 1.5, (Math.random() - 0.5) * 4).toArray(positionArray, i * 3)
      scaleArray[i] = size
    }
    return [positionArray, scaleArray]
  }, [count, size])
  useFrame((state, delta) => (shader.current.time += delta / 2))
  return (
    <points key={count}>
      <bufferGeometry>
        <bufferAttribute attachObject={['attributes', 'position']} count={count} array={positionArray} itemSize={3} />
        <bufferAttribute attachObject={['attributes', 'aScale']} count={count} array={scaleArray} itemSize={1} />
        <bufferAttribute attachObject={['varyings', 'myColour']} count={count} array={vec4Colour[0]} itemSize={1} />
      </bufferGeometry>
      <fireflyMaterial ref={shader} transparent depthWrite={false} />
    </points>
  )
}
