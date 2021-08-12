import React, { useRef, useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { useLoader, useFrame, } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Hands(props) {

    const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/cuppedhands.gltf')
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        mesh.current.rotation.y += 0.01;
    })

    return (
        <mesh
            layers={1}
            onClick={(event) => console.log('clicked!!!')}
            ref={mesh}>
            <primitive layers={1} object={gltf.scene} />
        </mesh>
    )
}

export default Hands;