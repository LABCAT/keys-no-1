import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Piano(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Piano.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={materials["Scene_-_Root"]}
        position={[0, -15, -50]}
        rotation={[5, 0, 0]}
        // rotation={[4.725, 0, 0]}
        // position={[0, 4, 0]}
      />
    </group>
  );
}

//https://sketchfab.com/3d-models/grand-piano-a007e6ebd5a64ff7b1aa7ef645b1df31
useGLTF.preload("/Piano.gltf");
