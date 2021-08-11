import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame, } from '@react-three/fiber'


function Platform(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.y += 0.01))

    return (
        <mesh
            position={[0, -8, 0]}
            {...props}
            ref={mesh}
            scale={1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[50, 3, 50]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export default Platform;