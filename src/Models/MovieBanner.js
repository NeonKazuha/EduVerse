import { useFBX } from '@react-three/drei'
import React from 'react'
useFBX
import { Html } from '@react-three/drei'
const MovieBanner = () => {
    const banner = useFBX('./models/MenuBoard.fbx')
    return (
        <>
            <primitive object={banner} position={[24, 3, 88]}
                rotation-x={-Math.PI / 2}
                rotation-z={-Math.PI / 3}


                scale={0.05} />
            <Html transform position={[24.2, 3, 87.9]}
                rotation-y={-Math.PI / 3}
                scale={0.41}

                occlude={'blending'} zIndexRange={[10, 1]}>
                <div className='w-[16vw] h-[100vh] ' style={{



                    background: `url('./movie.jpg')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: "repeat",
                    transform: 'rotateY(180deg)'
                }}>

                </div>
            </Html>



        </>
    )
}

export default MovieBanner