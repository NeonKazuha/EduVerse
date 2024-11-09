import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'

const Gate2 = () => {

    const banner = useFBX('./models/Banner_2.fbx')
    return (
        <>
            <primitive object={banner} position={[-9 , -1, -12.6]}
                rotation-y={Math.PI }
                scale={0.07} />

        </>
    )
}

export default Gate2