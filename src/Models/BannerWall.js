import { useFBX } from '@react-three/drei'
import React from 'react'

const BannerWall = () => {
    const banner = useFBX('./models/BannerWall.fbx')
    return (
        <>
            <primitive object={banner} position={[-62.5, -1, 6]} rotation-y={Math.PI / 2}

                scale={0.11} />

        </>
    )
}

export default BannerWall