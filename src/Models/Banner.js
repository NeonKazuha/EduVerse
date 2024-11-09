import React, { useRef } from 'react';
import { useFBX } from '@react-three/drei';
import { Html } from '@react-three/drei';
import Banner2 from './Banner2';
import Banner3 from './Banner3';
import Banner4 from './Banner4';
import MovieBanner from './MovieBanner';

const Banner = () => {
    const banner = useFBX('./models/Banner.fbx');


    return (
        <>
            <primitive object={banner} position={[0, 0, 78]} rotation-y={-Math.PI / 5} scale={0.07} />

            <Html transform position={[0.1, 4.1, 77.7]}
                rotation-y={-Math.PI / 5}
                scale={0.41}

                occlude={'blending'} zIndexRange={[10, 1]}>
                <div className='w-[100vw] h-[100vh] ' style={{



                    background: `url('./Wall1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                    transform: 'rotateY(180deg)'
                }}>

                </div>
            </Html>
            <Banner4 />
            <Banner2 />
            <Banner3 />
            <MovieBanner />
        </>
    );
};

export default Banner;
