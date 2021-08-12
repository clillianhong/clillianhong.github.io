import React, { useRef, Suspense, useMemo, useEffect, useCallback, set } from 'react'
import * as THREE from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useLoader, extend, Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import Swarm from './Swarm'
import MultiWordSwarm from './MultiWordSwarm'
import FishSwarm from './FishSwarm'

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


const Ocean = (props) => {

    const mouse = useRef([0, 0])
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), []);

    //fish

    return (<div className="object-cover h-full w-full">
        <Canvas
            onMouseMove={onMouseMove}
            onMouseUp={() => set(false)}
            onMouseDown={() => set(true)}
        >
            <ambientLight color={'#c7fffc'} intensity={0.5} />
            {/* <pointLight position={[-5, 5, 5]} /> */}
            <spotLight
                intensity={1}
                position={[40, -400, 50]}
                shadow-bias={-0.00005}
                penumbra={1}
                angle={Math.PI / 6}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                castShadow={true}
            />
            <Suspense fallback={null}>
                <MultiWordSwarm
                    mouse={mouse}
                    words={['fish', "SHARK??"]}
                    counts={[100, 1]}
                    colors={["#000000", "#FF0000"]} />
                <FishSwarm count={20} mouse={mouse} speedfactor={0.04} forwardVector={new THREE.Vector3(0, 0, 1)} scale={12} path={process.env.PUBLIC_URL + '/models/angelfish.gltf'} geo={'13009_Coral_Beauty_Angelfish_v1_l3'} mat={'13009_Coral_Beauty_Angelfish_v1'} />
                <FishSwarm count={30} mouse={mouse} speedfactor={0.1} forwardVector={new THREE.Vector3(-1, 0, 0)} scale={0.8} path={process.env.PUBLIC_URL + '/models/clownfish.gltf'} geo={'12265_Fish_v1_L2'} mat={'01___12265_Fish'} />
                <FishSwarm count={10} mouse={mouse} speedfactor={0.1} forwardVector={new THREE.Vector3(0, 0, 1)} scale={5} path={process.env.PUBLIC_URL + '/models/bluegreenfish.gltf'} geo={'13007_Blue-Green_Reef_Chromis_v2_l3'} mat={'13007_Blue_Green_Reef_Chromis_v1'} />
                < OrbitCam />
                <Swarm count={100} mouse={mouse} particle={<dodecahedronBufferGeometry attach="geometry" args={[0.2, 0]} />} matColor={'#31d67e'} />

            </Suspense>

        </Canvas>|

    </div >
    );



}

export default Ocean;