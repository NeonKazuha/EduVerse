import React from 'react'
import { Html } from '@react-three/drei'
import { useState } from 'react'
import UploadClass from '../Pages/UploadClass'
import UploadOfficeContent from '../Pages/UploadOfficeContent'
const UplaodOffice = () => {
    return (
        <Html transform occlude={'blending'} zIndexRange={[10, 1]} position={[-16, 2, -35]} rotation-y={Math.PI / 3}
            scale={0.1}  >
            <UploadOfficeContent/>

        </Html>
    )
}

export default UplaodOffice