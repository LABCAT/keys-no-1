import React  from "react";
import { useGLTF } from "@react-three/drei";

export default function GlassPiano(props) {
  const { nodes } = useGLTF("/GlassPiano.gltf");

  return (
     <primitive object={nodes['OSG_Scene']} position={[-1.5,0,0]} />
  );
}

//https://sketchfab.com/3d-models/glass-piano-8e333a3b1220494a8db27f68509715f2
useGLTF.preload("/GlassPiano.gltf");
