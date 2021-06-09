import React, { useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

//https://sketchfab.com/3d-models/glass-piano-8e333a3b1220494a8db27f68509715f2
export default function GlassPiano(props) {
  const url = '/GlassPiano.gltf';
  const [loaded, setLoaded] = useState();
  const { nodes } = useLoader(GLTFLoader, url, (loader) => {})

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      document.getElementById("play-icon").classList.add("show");
    }
  }, [loaded]);
  return <primitive object={nodes['OSG_Scene']} position={[-1.5,0,0]} />
}
