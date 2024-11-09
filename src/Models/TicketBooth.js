import { useGLTF, useFBX, useTexture } from '@react-three/drei'
import { useTeleportation } from '@react-three/xr'
import React from 'react'

const TicketBooth = () => {
    const ticket = useFBX("./models/Booth.fbx")

    const [colorMap, normalMap, roughnessMap] = useTexture([
        './models/textures/material_0_baseColor.png',
        './models/textures/material_0_normal.png',
        './models/textures/material_0_metallicRoughness.png',

    ])
    return (
        <>
            <primitive object={ticket} scale={0.5} position-z={88} position-x={+65} position-y={-1} rotation-y={Math.PI} />


        </>

    )
}

export default TicketBooth