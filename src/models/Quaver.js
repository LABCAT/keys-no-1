import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Quaver(props) {
    const group = useRef()
    const { colour, xPos } = props;
    console.log(xPos);
    const { nodes } = useGLTF('/Quaver.gltf')
    useFrame(() => {
        group.current.position.y = group.current.position.y += 0.01
    })
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                scale={0.05}
                geometry={nodes.mesh_0.geometry}
                position={[xPos, 0, 0]}
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

//https://sketchfab.com/3d-models/eighth-note-quaver-d0ac32d6475f46469df63df93b1c4e23
useGLTF.preload('/Quaver.gltf')
