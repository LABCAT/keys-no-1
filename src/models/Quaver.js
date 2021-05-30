import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Quaver(props) {
    const group = useRef()
    const { colour, xPos } = props;
    const { nodes, materials } = useGLTF('/Quaver.gltf')
    useFrame(() => {
        group.current.position.y = group.current.position.y += 0.05
    })
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                scale={1}
                geometry={nodes.mesh_0.geometry}
                position={[xPos, 10, -50]}
                rotation={[0, 5.25, 0]}
            >
                <meshStandardMaterial
                    attach="material"
                    color={colour}
                    roughness={0.6}
                    metalness={0}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('/Quaver.gltf')
