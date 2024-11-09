import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'

const Gate1 = () => {

    const banner = useFBX('./models/Banner_1.fbx')
    return (
        <>
            <>
                <primitive object={banner} position={[+40, 0, 99.6]}
                    rotation-z={Math.PI / 2}
                    // rotation-y={Math.PI / 2}
                    scale={0.027} />

            </>
        </>
    )
}

export default Gate1