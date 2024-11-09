import React from 'react'
import { useFBX, useGLTF } from '@react-three/drei'

const Store2 = () => {
    const shop = useGLTF('./models/shopfinal.glb')
    const banner = useFBX('./models/Banner_8.fbx')
    const banner2 = useFBX('./models/Banner_9.fbx')
    const banner3 = useFBX('./models/Banner_10.fbx')
    return (<>
    
        <primitive object={shop.scene} position={[69, -0.9, 37]} rotation-y={-Math.PI / 2}

scale={2.18} />
        {/* <primitive object={banner} position={[76, -0.9,54]}
            rotation-z={0}
            // rotation-y={Math.PI / 2}
            scale={0.077} />
        <primitive object={banner2} position={[85.5, -0.9, 44.5]}
            rotation-z={0}
            rotation-y={Math.PI / 2}
            scale={0.077} />
        <primitive object={banner3} position={[85.5, 6.8, 40.5]}
            rotation-z={Math.PI / 2}
            rotation-y={0}
            rotation-x={Math.PI / 2}    
            scale={0.17} /> */}
</>

        )

}

export default Store2

//[66.2718369374643, -0.9, 33.48149327444435]