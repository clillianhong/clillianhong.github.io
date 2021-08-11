import React, { useRef, useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { useLoader, useFrame, } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function HorizonLogo(props) {
    const mesh = useRef()
    // This reference will give us direct access to the mesh
    const logo = useLoader(GLTFLoader, './models/horizonlogo.gltf')
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    let theta = 0;

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        theta += 0.03;
        if (theta == 100) {
            theta = 0;
        }
        mesh.current.rotation.z = 30 * Math.PI / 180;
        mesh.current.rotation.y += 0.01
        mesh.current.position.set(0, 1 + 1.2 * Math.cos(theta), 0)
    }
    )

    return (
        <mesh
            ref={mesh}>
            <primitive object={logo.scene} />
        </mesh>
    )
}

export default HorizonLogo;