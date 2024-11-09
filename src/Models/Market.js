import React from 'react'
import { useFBX, useGLTF } from '@react-three/drei'

const Market = () => {
    const shop = useGLTF('./models/Mart.glb')
    return (
        <primitive object={shop.scene} position={[70, -0.9, 23]}  rotation-y={-Math.PI / 2}

            scale={2} />)

}

export default Market