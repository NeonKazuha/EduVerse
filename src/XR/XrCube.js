import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, OrbitControls, useFBX, useGLTF ,PresentationControls,Stage} from '@react-three/drei';

const XrModel = ({ url }) => {
    // url = "./models/shop.glb"
    const modelRef = useRef();
    const model = useGLTF(url);


    // const model = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/desk/model.gltf');

    // Rotate the model or cube
    // useFrame((state, delta) => {
    //     if (modelRef.current) {
    //         modelRef.current.rotation.y += delta;
    //     }
    // });

    return (
        <>
        <OrbitControls/>
            <Stage adjustCamera intensity={0.5} shadows="contact" environment="city">

                <primitive object={model.scene} scale={0.1} />
            </Stage>
            <ambientLight />
{/* 
            <PresentationControls
                enabled={true} // the controls can be disabled by setting this to false
                global={true} // Spin globally or by dragging the model
                cursor={true} // Whether to toggle cursor style on drag
                snap={true} // Snap-back to center (can also be a spring config)
                speed={1} // Speed factor
                zoom={1} // Zoom factor when half the polar-max is reached
                rotation={[0, 0, 0]} // Default rotation
                polar={[0, Math.PI / 2]} // Vertical limits
                azimuth={[-Infinity, Infinity]} // Horizontal limits
                config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
                // domElement={events.connected} // The DOM element events for this controller will attach to
            >

                {/* <mesh  scale={1}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={"mediumpurple"} />
                    
            </mesh> */}
            {/* </PresentationControls> */}
            {/* <OrbitControls /> */}
                {/* <primitive object={model.scene} scale={0.9}
                    position={[1,1,1]}  /> */}

                
            {/* <mesh ref={modelRef} scale={1}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={"mediumpurple"} />
            </mesh> */}
            {/* {url ? (
                <
            ) : (
                <mesh ref={modelRef} scale={1}>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color={"mediumpurple"} />
                </mesh>
            )} */}
        </>
    );
};

export default XrModel;
