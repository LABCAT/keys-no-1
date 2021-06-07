import React, { Suspense, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import FireFly from './components/FireFly'
import GlassPiano from "./components/GlassPiano.js";
import Quaver from "./components/Quaver.js";
import Loader from "./helpers/Loader.js";
import { Context } from "./context/Context.js";

export default function Scene() {
  const { notes, fireflies } = useContext(Context);
  const camera = { fov: 75, near: 0.1, far: 1000, position: [0,1,3] }
  return (
    <Canvas camera={camera}>
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <GlassPiano />
        <>
          {notes.map((note, index) => (
            <Quaver key={index} xPos={note.xPos} colour={note.colour} />
          ))}
        </>
        <>
          {fireflies.map((firefly, index) => (
            <FireFly key={index} size={firefly.size} colour={firefly.colour} />
          ))}
        </>
        <Stars/>
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
