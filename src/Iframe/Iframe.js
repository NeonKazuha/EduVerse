import { Html, PresentationControls } from '@react-three/drei'
import React from 'react'

const Iframe = () => {

    return (
        <PresentationControls >
            <ambientLight />
            <mesh scale={1.5} rotation-y={-Math.PI / 6} >
                <planeGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={"mediumpurple"} />
            </mesh>

            <Html transform position={[0, 1, 0]} rotation-y={-Math.PI / 6} scale={1}>
                <iframe src="http://localhost:3000/user/product" />
            </Html>
        </PresentationControls>
    )
}

export default Iframe