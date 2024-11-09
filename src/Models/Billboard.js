import React from 'react'
import { useGLTF } from '@react-three/drei'
const Billboard = () => {
    const shop = useGLTF('./models/billboard.glb')

    return (<>
        <primitive object={shop.scene} position={[10, 0, 40]} rotation-y={+Math.PI / 2 -Math.PI / 3}

            scale={0.51} />

    </>

    )
}

export default Billboard