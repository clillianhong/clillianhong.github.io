import React, { useRef, useState, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

import { noise } from "./Perlin";
import * as THREE from 'three'
import glsl from 'babel-plugin-glsl/macro'

const ColorShiftMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.9, 0.0, 0.1) },
    // vertex shader
    glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // fragment shader
    glsl`
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }
  `
)

extend({ ColorShiftMaterial })

const GlowShaderMaterial = {
    uniforms: {
        viewVector: { type: "v3", value: new THREE.Vector3(0, 0, 0) }
    },
    vertexShader: `
    uniform vec3 viewVector;
    varying float intensity;
    void main() {
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
        vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
        intensity = pow( dot(normalize(viewVector), actual_normal), 8.0 );
    }
    `,
    fragmentShader: `
      varying float intensity;
      void main() {
        vec3 glow = vec3(0, 1, 0) * intensity;
        gl_FragColor = vec4( glow, 1.0 );
      }
    `
};

function Planet(props) {

    const mesh = useRef();
    const WIDTH_ADJUST = 100;
    const HEIGHT_ADJUST = 100;

    const updateMesh = ({ geometry }) => {
        noise.seed(Math.random());
        let pos = geometry.getAttribute("position");
        let pa = pos.array;
        const hVerts = geometry.parameters.heightSegments + 1;
        const wVerts = geometry.parameters.widthSegments + 1;
        for (let j = 0; j < hVerts; j++) {
            for (let i = 0; i < wVerts; i++) {
                const ex = 1.1;
                pa[3 * (j * wVerts + i) + 2] =
                    (noise.simplex2(i / 100, j / 100) +
                        noise.simplex2((i + 200) / 50, j / 50) * Math.pow(ex, 1) +
                        noise.simplex2((i + 400) / 25, j / 25) * Math.pow(ex, 2) +
                        noise.simplex2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3) +
                        +(noise.simplex2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 4))) /
                    2;
            }
        }

        pos.needsUpdate = true;
    };



    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(({ camera }) => {

        mesh.current.rotation.y += 0.001;

        const camVec = camera.position;
        const glowVec = new THREE.Vector3();
        glowRef.current.getWorldPosition(glowVec);
        const viewVector = new THREE.Vector3().subVectors(camVec, glowVec);
        glowRef.current.material.uniforms.viewVector.value = viewVector;
    });

    const glowRef = useRef();



    return (
        <group ref={mesh}>
            <mesh onUpdate={updateMesh} rotation={[-Math.PI / 2, 0, 0]} position={props.position}>
                <planeGeometry attach="geometry" args={[props.width / WIDTH_ADJUST, props.width / WIDTH_ADJUST, 75, 75]} />
                <meshPhongMaterial
                    attach="material"
                    color={"hotpink"}
                    specular={"hotpink"}
                    shininess={3}
                    flatShading
                />

            </mesh>


            <mesh ref={glowRef} onUpdate={updateMesh} rotation={[-Math.PI / 2, 0, 0]} position={props.position}>
                <planeGeometry attach="geometry" args={[props.width / WIDTH_ADJUST, props.width / WIDTH_ADJUST, 200, 200]} />
                <shaderMaterial
                    attach="material"
                    args={[GlowShaderMaterial]}
                    side={THREE.FrontSide}
                    blending={THREE.AdditiveBlending}
                    transparent={true}
                />

            </mesh>
        </group>

    )
}

export default Planet;