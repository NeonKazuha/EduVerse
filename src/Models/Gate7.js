import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'

const Gate7 = () => {

    const banner = useFBX('./models/Banner_7.fbx')
    return (
        <>
            <primitive object={banner} position={[-12, -1, -12.6]}
                rotation-y={Math.PI}
                scale={0.1} />

        </>
    )
}

export default Gate7