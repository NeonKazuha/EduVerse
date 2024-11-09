import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'

const Gate4 = () => {

    const banner = useFBX('./models/Banner_4.fbx')
    return (
        <>
            <primitive object={banner} position={[+10, 0, -40]}
                rotation-z={Math.PI / 2}
                scale={0.027} />

        </>
    )
}

export default Gate4