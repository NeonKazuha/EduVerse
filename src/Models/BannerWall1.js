import { useFBX } from '@react-three/drei'
import React from 'react'

const BannerWall1 = () => {
    const banner = useFBX('./models/BannerWall1.fbx')
    return (
        <>
            <primitive object={banner} position={[+91.5, -1, -1]} rotation-y={Math.PI / 2}

                scale={0.074} />

        </>
    )
}

export default BannerWall1