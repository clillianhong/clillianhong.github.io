import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import HorizonLogo from './HorizonLogo'
import Hand from './Hands'

const HorizonFigure = () => {
    const horizon = useRef();
    useFrame(() => {
        var rot = horizon.current.rotation
        horizon.current.rotation.set(rot.x, rot.y + 0.01, rot.z)
    }, 0)
    return (
        <group ref={horizon}>
            <Hand />
            <HorizonLogo />
        </group>
    )
}

export default HorizonFigure 