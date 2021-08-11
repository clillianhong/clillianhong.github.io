import React, { useRef, useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { useLoader, useFrame, } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

function Airplane(props) {

    const gltf = useLoader(GLTFLoader, './models/paperairplane.gltf')
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead

    const upVector = new THREE.Vector3(0, 1, 0);
    var m_Speed = .003;
    const m_YScale = 15;
    const m_XScale = 10;
    const m_2PI = Math.PI * 2
    const m_3PI = 1 / 3 * Math.PI
    const posOffset = new THREE.Vector3(0, 0, -15);
    var m_Pivot = new THREE.Vector3(0, 0, 0);
    var m_Phase = 0;
    var m_turn_Phase = 0;
    var m_Invert = false;
    var m_turn_Invert = false;
    var lastUpdate = Date.now();
    var stop = false;

    useFrame(() => {
        var now = Date.now();
        var dt = now - lastUpdate;
        lastUpdate = now;

        if (stop) {
            return
        }

        //mesh.current.rotation.z = 0.5 * Math.cos(m_Phase);
        mesh.current.rotation.x = 0.2 * Math.cos(m_Phase);
        mesh.current.rotation.y = (m_Invert ? 1 : -1) * 4 * Math.cos(0.29 * m_Phase) + (m_Invert ? 0 : Math.PI);

        var m_PivotOffset = new THREE.Vector3(0, 0, 1);
        m_PivotOffset.multiplyScalar(2 * m_YScale)

        m_Phase += m_Speed * dt;
        m_turn_Phase += m_Speed * dt;
        if (m_Phase > m_2PI) {
            m_Invert = !m_Invert;
            m_Phase -= m_2PI;
        } if (m_turn_Phase > m_3PI) {
            m_turn_Invert = !m_Invert;
            m_turn_Phase -= m_3PI;
        }
        if (m_turn_Phase < 0) m_turn_Phase += m_3PI
        if (m_Phase < 0) m_Phase += m_2PI;

        var newPos = new THREE.Vector3(m_Pivot.x, m_Pivot.y, m_Pivot.z)
        if (m_Invert) {
            newPos.add(m_PivotOffset)
        }

        var x = Math.sin(m_Phase) * m_XScale;
        var y = Math.cos(m_Phase) * (m_Invert ? -1 : 1) * m_YScale;

        mesh.current.position.set(newPos.x + x + posOffset.x, newPos.y + posOffset.y, newPos.z + y + posOffset.z)
    })

    return (
        <>

            <mesh
                layers={1}
                scale={100}
                onPointerOver={() => {
                    stop = true
                }}
                onPointerOut={() => {
                    stop = false
                }}
                onClick={(event) => window.open("https://stackoverflow.com/questions/13071967/adding-an-onclick-function-to-go-to-url-in-javascript")}
                ref={mesh}>
                <primitive layers={1} object={gltf.scene} />

            </mesh>
        </>
    )
}

export default Airplane;