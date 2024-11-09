import React from 'react'
import { Html } from '@react-three/drei'
import { useState } from 'react'
import UploadClass from '../Pages/UploadClass'
import UploadOfficeContent from '../Pages/UploadOfficeContent'
const UploadConference = () => {
    return (
        <Html transform occlude={'blending'} zIndexRange={[10, 1]} position={[50, 4, -155]  } rotation-y={-Math.PI / 8}
            scale={0.1}  >
            <UploadOfficeContent />

        </Html>
    )
}

export default UploadConference