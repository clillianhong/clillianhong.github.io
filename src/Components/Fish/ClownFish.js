import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Clownfish(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/models/clownfish.gltf')
    return (
        // <group ref={group} {...props} dispose={null}>
        // <mesh
        //     castShadow
        //     receiveShadow
        //     geometry={nodes['12265_Fish_v1_L2'].geometry}
        //     material={materials['01___12265_Fish']}
        //     rotation={[1.57, 1.57, -1.57]}
        // />
        // </group>
        <bufferGeometry geometry={nodes['12265_Fish_v1_L2'].geometry} />

    )
}

useGLTF.preload('/clownfish.gltf')
