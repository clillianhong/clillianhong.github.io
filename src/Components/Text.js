import * as THREE from 'three'
import React, { forwardRef, useMemo, useRef, useLayoutEffect } from 'react'
import { useLoader, } from '@react-three/fiber'
import Roboto_Bold from '../font/Roboto_Bold.json';


const Text = ({ word }) => {
    const font = new THREE.FontLoader().parse(Roboto_Bold);
    // const displayWord = () => sample(words)

    // configure font geometry
    const textOptions = {
        font,
        size: 2,
        height: 0.2
    };


    return (
        <textGeometry attach='geometry' args={[word, textOptions]} />
    )
}

export default Text;
