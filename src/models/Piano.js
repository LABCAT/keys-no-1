import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Piano(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Piano.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={materials['Scene_-_Root']}
        position={[0, -15, -50]}
        rotation={[5, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/Piano.gltf')
