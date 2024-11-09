import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'

const Gate6 = () => {

    const banner = useFBX('./models/Banner_6.fbx')
    return (
        <>
            <primitive object={banner} position={[100, -2, 53]}
                rotation-y={Math.PI / 2}
                scale={0.43} />

        </>
    )
}

export default Gate6