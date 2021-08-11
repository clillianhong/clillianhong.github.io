import React, { useRef, Suspense, useState, useEffect, useCallback, set } from 'react'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useLoader, extend, Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import Airplane from './Airplane'

extend({ UnrealBloomPass })

const OrbitCam = () => {
    const orbit = useRef()
    const {
        camera,
        gl: { domElement },
    } = useThree();

    camera.position.set(15, 20, 0);

    useFrame(() => orbit.current && orbit.current.update());

    return <OrbitControls ref={orbit} args={[camera, domElement]} />
}


const Resume = (props) => {

    const mouse = useRef([0, 0])
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), []);

    //fish

    return (<div className="object-cover h-full w-full">
        <Canvas
            onMouseMove={onMouseMove}
            onMouseUp={() => set(false)}
            onMouseDown={() => set(true)}
        >


            <ambientLight color={"#0000ff"} intensity={0.5} />
            {/* <pointLight position={[-5, 5, 5]} /> */}
            <spotLight
                intensity={0.1}
                position={[40, 100, 50]}
                shadow-bias={-0.00005}
                penumbra={1}
                angle={Math.PI / 6}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                castShadow={true}
            />
            <Suspense fallback={null}>
                < OrbitCam />
                <Airplane />
            </Suspense>

        </Canvas>|

    </div >
    );



}

export default Resume;