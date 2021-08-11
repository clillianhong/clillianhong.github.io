import React, { useRef, useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { useLoader, useFrame, } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Thonker(props) {

    const gltf = useLoader(GLTFLoader, './models/thonker.gltf')
    // This reference will give us direct access to the mesh
    const mesh = useRef()

    const fast = 0.1;
    const slow = 0.01;
    var rotateSlow = false;
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        mesh.current.rotation.y += rotateSlow ? slow : fast;
    })

    return (
        <mesh
            layers={1}
            scale={6000}
            onPointerOver={() => {
                rotateSlow = true
            }}
            onPointerOut={() => {
                rotateSlow = false
            }}
            onClick={(event) => window.open("https://www.amazon.com/")}
            ref={mesh}>
            <primitive layers={1} object={gltf.scene} />
        </mesh>
    )
}

export default Thonker;