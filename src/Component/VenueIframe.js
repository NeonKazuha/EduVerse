import React from 'react'
import { Html } from '@react-three/drei'
const VenueIframe = ({ url }) => {
    return (
        <Html transform occlude={'blending'}
            zIndexRange={[10, 1]} position={[0, 10.6, -179]} rotation-y={0}
            scale={0.9}  >
            <iframe width={"1570px"} height={"800vh"} src={url} frameborder="5" />

        </Html>
    )
}

export default VenueIframe