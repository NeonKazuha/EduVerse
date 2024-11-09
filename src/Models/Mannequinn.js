import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'

const Mannequinn = () => {
    const shop = useGLTF('./models/mannequinn/the_king_costume.glb')
    const mannequinn2 = useGLTF('./models/mannequinn/manne2.glb')
    const mannequinn3 = useGLTF('./models/mannequinn/manne3.glb')
    const mannequinn4 = useGLTF('./models/mannequinn/manne4.glb')
    return (<>
        <primitive object={shop.scene} position={[65, -0.9, 39]} rotation-y={-Math.PI / 2}

            scale={2.11} />
        <primitive object={mannequinn2.scene} position={[65, -0.9, 41.3]} rotation-y={-Math.PI/2 }

            scale={2.11} />
        <primitive object={mannequinn3.scene} position={[65, -0.9, 47]} rotation-y={-Math.PI/2}

            scale={2.11} />
        <primitive object={mannequinn4.scene} position={[65, -0.9, 44]} rotation-y={-Math.PI / 2}
            scale={0.21} />
    </>
       
    )
}

export default Mannequinn