import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'

const Gate3 = () => {

    const banner = useFBX('./models/Banner_3.fbx')
    return (
        <>
            <primitive object={banner} position={[57, 0, 0]}
                rotation-y={Math.PI / 2}
                rotation-z={Math.PI / 2}
                scale={0.027} />


        </>
    )
}

export default Gate3