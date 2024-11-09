import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'

const Podium = () => {
    const shop = useGLTF('./models/podium.glb')

    return (<>
        <primitive object={shop.scene} position={[25, -0.9, 10]} rotation-y={-Math.PI / 2}

            scale={8.11} />
       
    </>

    )
}

export default Podium