import React from 'react'
import { useFBX } from '@react-three/drei'
import { Html } from '@react-three/drei'
import { useRef } from 'react'
const Banner2 = () => {

    const banner = useFBX('./models/Banner2.fbx')
    const imageRef = useRef();

    return (
        <>

            <primitive object={banner} position={[+55, 3, 92]}

                scale={0.07} />
            <Html transform position={[55, 7, 92]}

                scale={0.41}

                occlude={'blending'} zIndexRange={[10, 1]}>
                <div className='w-[100vw] h-[100vh]' style={{



                    background: `url('./Wall5.jpg')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                    transform: 'rotateY(180deg)'
                }}>

                </div>
            </Html>

        </>
    )
}

export default Banner2