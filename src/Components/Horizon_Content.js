import React, { useRef, Suspense, useMemo, useEffect, useCallback, set } from 'react'
import HorizonLogo from './FacebookHorizon/HorizonLogo'
import Hand from './FacebookHorizon/Hands'
import * as THREE from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { extend, Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MultiWordSwarm from './MultiWordSwarm'
import Swarm from './Swarm'
import { BloomEffect } from './Effects/Bloom'

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

// function Effect({ layer }) {
//     const bloomComposer = useRef()
//     // const normalComposer = useRef()
//     // const finalComposer = useRef()
//     const occlusionRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
//     const bloomRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
//     const { scene, gl, size, camera } = useThree()
//     const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
//     useEffect(() => {
//         void bloomComposer.current.setSize(size.width, size.height)
//         // void normalComposer.current.setSize(size.width, size.height)
//         // void finalComposer.current.setSize(size.width, size.height)
//     }, [size])
//     useFrame(() => {
//         camera.layers.set(0);
//         bloomComposer.current.render()

//     }, 1)
//     return (
//         <>
//             <effectComposer ref={bloomComposer} args={[gl]} >
//                 <renderPass attachArray="passes" scene={scene} camera={camera} />
//                 <unrealBloomPass attachArray="passes" args={[aspect, 0.3, 1, 0]} />
//             </effectComposer>
//         </>

//     )
// }



const Horizon = (props) => {

    const mouse = useRef([0, 0])
    const horizon = useRef()
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), []);


    return (<div className="object-cover h-full w-full">
        <Canvas
            onMouseMove={onMouseMove}
            onMouseUp={() => set(false)}
            onMouseDown={() => set(true)}
        >
            <ambientLight intensity={0.5} />

            <spotLight
                intensity={2}
                position={[40, 200, 50]}
                shadow-bias={-0.00005}
                penumbra={1}
                angle={Math.PI / 6}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                castShadow={true}
            />
            <pointLight position={[0, 1000, 0]} distance={40} intensity={8} color="lightblue" />
            <Suspense fallback={null}>
                <Swarm count={100} mouse={mouse} matColor={"#ac54ff"} particle={<dodecahedronBufferGeometry attach="geometry" args={[0.2, 0]} />
                } />
                <MultiWordSwarm
                    mouse={mouse}
                    words={['hand tracking', 'virtual reality', 'oculus', 'horizon']}
                    counts={[10, 12, 8, 10]}
                    colors={["#ff78fd", "#9000ff", "#ff61f2", "#001aff"]} />
                < OrbitCam />
                <Hand />
                <HorizonLogo />
                <BloomEffect down={false} />
            </Suspense>

        </Canvas>|

    </div >
    );



}

export default Horizon;