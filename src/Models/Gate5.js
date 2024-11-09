import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'

const Gate5 = () => {

    const banner = useFBX('./models/Banner_5.fbx')
    return (
        <>
            <primitive object={banner} position={[0, -2, 13]}
                rotation-y={Math.PI/2}
                scale={0.13} />

        </>
    )
}

export default Gate5