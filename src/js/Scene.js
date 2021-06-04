import React, { Suspense, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Piano from "../models/Piano.js";
import GlassPiano from "../models/GlassPiano.js";
import Quaver from "../models/Quaver.js";
import Loader from "./helpers/Loader.js";

import { Context } from "./context/Context.js";

//tutorials and examples
//https://docs.pmnd.rs/react-three-fiber/getting-started/loading-models
//https://codesandbox.io/s/rrppl0y8l4?file=/src/App.js:1078-1101
//https://codesandbox.io/s/r3f-suspense-zu2wo?file=/src/index.js:809-829
export default function Scene() {
  const { notes } = useContext(Context);
  console.log(notes);
  const camera = { fov: 75, near: 0.1, far: 1000, position: [0,1,2] }
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
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
