import React, { useState, useEffect } from 'react';
import XrCube from '../XR/XrCube';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ShowModel = ({ url, onClose }) => {
    const [show, setShow] = useState(true);
    const [model, setModel] = useState(null);

    useEffect(() => {
        const fetchModel = async () => {
            const loadedModel = await useGLTF(url);
            setModel(loadedModel);
        };

        fetchModel();
    }, []);

    ////console.log(model);
    const handleShow = () => {
        onClose();
    };

    const handleARButtonClick = () => {


        const fetch = async () => {
            await axios.post('http://localhost:3002/api/v1/user/upload', {
                path: selectedFile
            })
        }

        window.open('http://localhost:5173/', '_blank');
    };

    return (
        <>
            {show && (
                <div className='shadow-2xl absolute z-10 bottom-5 right-5 border-[1px] flex flex-col justify-around align-middle'>
                    <button onClick={handleShow} className="px-4 right-1 bg-transparent/15 text-white border-white top-1 absolute m-1 py-2 mb-1 text-[10px] outline-none border-2 rounded font-medium active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">back</button>
                    <Canvas style={{ width: '350px', height: '250px' }}>
                        <OrbitControls />
                        <ambientLight />
                        {/* <XrCube /> */}
                        {model && <primitive object={model.scene} scale={5} />}
                    </Canvas>
                    <div className='flex flex-row justify-center'>
                        <button onClick={handleARButtonClick} className="px-4 bg-transparent/15 text-white border-white m-1 py-2 mb-1 text-[10px] outline-none border-2 rounded font-medium active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">AR</button>

                    </div>
                </div>
            )}
        </>
    );
};

export default ShowModel;
