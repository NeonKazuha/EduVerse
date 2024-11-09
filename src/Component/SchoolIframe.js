import React from 'react'
import { Html } from '@react-three/drei'
const SchoolIframe = ({ url }) => {
    return (
        <Html transform occlude={'blending'}
            zIndexRange={[10, 1]} position={[73.4, 2.9, 0.67]} rotation-y={Math.PI}
            scale={0.18}  >
            <iframe width={"1600px"} height={"700vh"} src={url} frameborder="5" />

        </Html>
    )
}

export default SchoolIframe