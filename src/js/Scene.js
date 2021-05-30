import React, { Suspense, useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
//https://sketchfab.com/3d-models/grand-piano-a007e6ebd5a64ff7b1aa7ef645b1df31
import Piano from '../models/Piano.js'
// /https://sketchfab.com/3d-models/eighth-note-quaver-d0ac32d6475f46469df63df93b1c4e23
import Quaver from '../models/Quaver.js'
import Loader from './helpers/Loader.js'

import { Context } from './context/Context.js';

//tutorials and examples
//https://docs.pmnd.rs/react-three-fiber/getting-started/loading-models
//https://codesandbox.io/s/rrppl0y8l4?file=/src/App.js:1078-1101
//https://codesandbox.io/s/r3f-suspense-zu2wo?file=/src/index.js:809-829
export default function Scene() {
    const { notes } = useContext(Context);
    console.log(notes);
    return (
        <Canvas>
            <Suspense fallback={<Loader />}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Piano />
                <>
                {
                    notes.map(
                        (colour, index) => (
                            <Quaver key={index} xPos={index} colour={colour} />
                        )
                    )
                }
                </>
                <OrbitControls />
            </Suspense>
        </Canvas> 
    )
}
