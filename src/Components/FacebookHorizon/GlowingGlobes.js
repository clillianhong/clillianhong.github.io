import React, { useRef, useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { useLoader, useFrame, } from '@react-three/fiber'

function GlowingGlobe(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.y += 0.01))

    return (
        <mesh
            position={props.position}
            layers={1}
            ref={mesh}>
            <sphereBufferGeometry args={[3, 32, 32]} />
            {/* <meshPhongMaterial
                attach="material"
                color={"hotpink"}
                specular={"hotpink"}
                shininess={3}
                flatShading
            /> */}
            <meshBasicMaterial />

        </mesh>
    )
}

export default GlowingGlobe;