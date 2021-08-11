import React, { useRef, Suspense, useMemo, useEffect, useCallback, set } from 'react'
import * as THREE from 'three'
import { extend, Canvas, useThree, useFrame } from '@react-three/fiber'

export function BloomEffect({ layer }) {
    const bloomComposer = useRef()
    // const normalComposer = useRef()
    // const finalComposer = useRef()
    const occlusionRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
    const bloomRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
    const { scene, gl, size, camera } = useThree()
    const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
    useEffect(() => {
        void bloomComposer.current.setSize(size.width, size.height)
        // void normalComposer.current.setSize(size.width, size.height)
        // void finalComposer.current.setSize(size.width, size.height)
    }, [size])
    useFrame(() => {
        camera.layers.set(0);
        bloomComposer.current.render()

    }, 1)
    return (
        <>
            <effectComposer ref={bloomComposer} args={[gl]} >
                <renderPass attachArray="passes" scene={scene} camera={camera} />
                <unrealBloomPass attachArray="passes" args={[aspect, 0.3, 1, 0]} />
            </effectComposer>
        </>

    )
}