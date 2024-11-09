import { useFBX } from '@react-three/drei'
import React from 'react'
import { Html } from '@react-three/drei'

const Banner4 = () => {
    const banner = useFBX('./models/Banner4.fbx')
    return (
        <>
            <primitive object={banner} position={[10, 10, 78]}
                rotation-y={-Math.PI / 5}
                scale={0.07} />
            <Html transform position={[10, 14, 78]}
                rotation-y={-Math.PI / 5}
                scale={0.41}

                occlude={'blending'} zIndexRange={[10, 1]}>
                <div className='w-[100vw] h-[100vh]' style={{



                    background: `url('./Wall2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundRepeat : "no-repeat",
                    transform: 'rotateY(180deg)'
                }}>

                </div>
            </Html>

        </>
    )
}

export default Banner4