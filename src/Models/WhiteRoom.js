import { useGLTF } from '@react-three/drei'
import React from 'react'
import Presentation from '../Iframe/Presentationiframe'
import Presentationiframe from '../Iframe/Presentationiframe'
import BannerWall1 from './BannerWall1'

const WhiteRoom = () => {
    const WhiteRoom = useGLTF("./models/white_room.glb")
    return (<>
        <group position={[80, 0, 19]} rotation-y={-Math.PI} >

            <primitive object={WhiteRoom.scene} rotation-y={Math.PI} position={[+100, -0.4, 0]} scale={3} />
            <Presentationiframe />
            <BannerWall1 />
        </group>


    </>
    )
}

export default WhiteRoom