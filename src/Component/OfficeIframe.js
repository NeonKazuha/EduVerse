import React from 'react'
import { Html } from '@react-three/drei'
const OfficeIframe = ({ url }) => {
    return (
        <Html transform occlude={'blending'}
            zIndexRange={[10, 1]} position={[-69.0, 3.7, -6]} rotation-y={0}
            scale={0.30} >
            <iframe width={"1570px"} height={"720vh"} src={url} frameborder="5" />

        </Html>
    )
}

export default OfficeIframe