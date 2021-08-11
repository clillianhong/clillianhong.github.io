import React, { useRef, Suspense, useMemo, useEffect, hover, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { extend, Canvas, useThree, useFrame } from '@react-three/fiber'
import Text from './Text'
var sample = require('lodash/sample');

function WordSwarm({ count, mouse, word, color }) {
    const mesh = useRef()
    const light = useRef()
    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width

    const dummy = useMemo(() => new THREE.Object3D(), [])
    // Generate some random positions, speed factors and timings
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])
    // The innards of this hook will run every frame
    useFrame(state => {
        // Makes the light follow the mouse
        // light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0)
        // Run through the randomized data to calculate some movement
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            // There is no sense or reason to any of this, just messing around with trigonometric functions
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            particle.mx += (mouse.current[0] - particle.mx) * 0.01
            particle.my += (mouse.current[1] * -1 - particle.my) * 0.01
            // Update the dummy object
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            // And apply the matrix to the instanced item
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
        <>
            {/* <pointLight ref={light} position={[0, 200, 0]} distance={40} intensity={8} color="lightblue" /> */}
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <Text word={word} />
                <meshPhongMaterial attach="material" color={color} />
            </instancedMesh>
        </>
    )
}

export default WordSwarm;



// const tempObject = new THREE.Object3D()
// const tempColor = new THREE.Color()
// const data = new Array(1000).fill().map(() => ({ color: niceColors[17][Math.floor(Math.random() * 5)], scale: 1 }))

// function Boxes() {
//   const [hovered, set] = useState()
//   const colorArray = useMemo(() => Float32Array.from(new Array(1000).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())), [])
//   const meshRef = useRef()
//   const prevRef = useRef()
//   useEffect(() => void (prevRef.current = hovered), [hovered])
//   useFrame((state) => {
//     const time = state.clock.getElapsedTime()
//     meshRef.current.rotation.x = Math.sin(time / 4)
//     meshRef.current.rotation.y = Math.sin(time / 2)
//     let i = 0
//     for (let x = 0; x < 10; x++)
//       for (let y = 0; y < 10; y++)
//         for (let z = 0; z < 10; z++) {
//           const id = i++
//           tempObject.position.set(5 - x, 5 - y, 5 - z)
//           tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
//           tempObject.rotation.z = tempObject.rotation.y * 2
//           if (hovered !== prevRef.Current) {
//             tempColor.set(id === hovered ? 'white' : data[id].color).toArray(colorArray, id * 3)
//             meshRef.current.geometry.attributes.color.needsUpdate = true
//           }
//           const scale = (data[id].scale = THREE.MathUtils.lerp(data[id].scale, id === hovered ? 4 : 1, 0.1))
//           tempObject.scale.setScalar(scale)
//           tempObject.updateMatrix()
//           meshRef.current.setMatrixAt(id, tempObject.matrix)
//         }
//     meshRef.current.instanceMatrix.needsUpdate = true
//   })
//   return (
//     <instancedMesh ref={meshRef} args={[null, null, 1000]} onPointerMove={(e) => set(e.instanceId)} onPointerOut={(e) => set(undefined)}>
//       <boxGeometry args={[0.4, 0.4, 0.4]}>
//         <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
//       </boxGeometry>
//       <meshPhongMaterial vertexColors={THREE.VertexColors} />
//     </instancedMesh>
//   )
// }
