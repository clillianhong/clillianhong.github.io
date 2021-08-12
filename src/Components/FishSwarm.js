import React, { useRef, Suspense, useMemo, useEffect, hover, useLayoutEffect, useState } from 'react'
import * as THREE from 'three'
import { extend, Canvas, useThree, useFrame } from '@react-three/fiber'

import { useGLTF } from '@react-three/drei'

import { Quaternion } from 'three'


const FishSwarm = ({ count, mouse, speedfactor, scale, forwardVector, path, geo, mat }) => {
    const distanceFactor = 100;
    const mesh = useRef()
    const light = useRef()
    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
    const { nodes, materials } = useGLTF(path)


    const dummy = useMemo(() => new THREE.Object3D(), [])
    // Generate some random positions, speed factors and timings
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = speedfactor + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            var targetVec = new THREE.Vector3(-(distanceFactor * 2) + Math.random() * distanceFactor * 2, -(distanceFactor * 2) + Math.random() * distanceFactor * 2, -(distanceFactor) + Math.random() * distanceFactor * 2)

            var currentVec = new THREE.Vector3(-(distanceFactor * 2) + Math.random() * distanceFactor * 2, -(distanceFactor * 2) + Math.random() * distanceFactor * 2, -(distanceFactor) + Math.random() * distanceFactor * 2)

            var forwardVec = forwardVector
            var rot = new THREE.Quaternion()
            var eul = new THREE.Euler();
            eul.set(0, 0, 0)
            rot.setFromEuler(eul)

            temp.push({ t, factor, speed: speed, xFactor, yFactor, zFactor, mx: 0, my: 0, target: targetVec, currentPos: currentVec, forwardVec: forwardVec, startQuat: rot })
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

            if (particle.currentPos != null) {
                var oldPos = new THREE.Vector3(particle.currentPos.x, particle.currentPos.y, particle.currentPos.z)
                var dir = new THREE.Vector3(particle.target.x, particle.target.y, particle.target.z)

                dir.sub(particle.currentPos)
                dir.normalize()

                // console.log("TARGET1 " + particle.target.x + " " + particle.target.y + " " + particle.target.z)
                // console.log("TARGET 2" + particle.currentPos.x + " " + particle.currentPos.y + " " + particle.currentPos.z)

                // console.log("target dir " + dir.x + " " + dir.y + " " + dir.z)
                var newPos = oldPos.add(dir.multiplyScalar(particle.speed))
                particle.currentPos.set(newPos.x, newPos.y, newPos.z)
                // Update the dummy object
                dummy.position.set(
                    newPos.x, newPos.y, newPos.z
                )

                dir.normalize()

                var targetQuat = new THREE.Quaternion()
                targetQuat.setFromUnitVectors(particle.forwardVec, dir)

                if (particle.startQuat.angleTo(targetQuat))
                    particle.startQuat.rotateTowards(targetQuat, 0.05)

                dummy.scale.set(scale, scale, scale)
                // dummy.rotation.set(0, 0, 0)
                dummy.rotation.setFromQuaternion(particle.startQuat)
                dummy.updateMatrix()

                //update 
                if (particle.currentPos.distanceTo(particle.target) < 1) {
                    // particle.forwardVec.set(dir.x, dir.y, dir.z)
                    particle.startQuat.set(targetQuat.x, targetQuat.y, targetQuat.z, targetQuat.w)
                    var target = new THREE.Vector3(-(distanceFactor / 2) + Math.random() * distanceFactor, -(distanceFactor / 2) + Math.random() * distanceFactor, -(distanceFactor / 2) + Math.random() * distanceFactor);
                    target.add(particle.currentPos)
                    particle.target.set(target.x, target.y, target.z)

                }

                // And apply the matrix to the instanced item
                mesh.current.setMatrixAt(i, dummy.matrix)
            }


        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
        <>
            {/* <pointLight ref={light} position={[0, 200, 0]} distance={40} intensity={8} color="lightblue" /> */}
            <instancedMesh ref={mesh} args={[nodes[geo].geometry, materials[mat], count]}>
                {/* {particle} */}
                {/* <Clownfish /> */}
                {/* <dodecahedronBufferGeometry attach="geometry" args={[0.2, 0]} /> */}
                {/* <meshPhongMaterial attach="material" color="#cc00ff" /> */}
            </instancedMesh>
        </>
    )
}

export default FishSwarm;

//     geometry={nodes['12265_Fish_v1_L2'].geometry}
        //     material={materials['01___12265_Fish']}