import { useGLTF } from '@react-three/drei'
import React, { Suspense } from 'react'

const Room = () => {

    const room = useGLTF("./models/room_blank.glb");
    return (
        <Suspense>
            <primitive object={room.scene} position={[0, 0, 100]} scale={4} />
        </Suspense>
    )
}

export default Room