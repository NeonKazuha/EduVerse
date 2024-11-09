import React, { useState } from 'react'
import axios from "axios";
import { Html } from '@react-three/drei';
const ProcessML = () => {
    const [path, setPath] = useState("");
    const HandleChange = (e) => {
        setPath(e.target.value);
        ////console.log(path);


    }

    const [loading, setLoading] = useState("");
    const HandleProcess = async () => {
        try {
            const form = new FormData();
            form.append('file_path', path); // Assuming file is obtained from an input element
            setLoading("Loading...");
            ////console.log("Processing", path);

            const response = await axios.post('http://localhost:8000/process_pdf/', form);

            ////console.log(response.data.message);
            setLoading("Processing Completed!");
            // Handle the response or update UI as needed
        } catch (error) {
            console.error('Error processing PDF:', error);
            setLoading("Error Occured ! Please check and try again");
            // Handle errors or show error messages
        }
    }
    return (
        <>
            <Html transform occlude={'blending'} zIndexRange={[10, 1]} position={[-24.65, 1.7, 0]} rotation-y={-(Math.PI / 3) * 4}
                scale={0.2}  >
                <div className='border-2 bg-cyan-300  flex  flex-col align-middle justify-center  text-center gap-2 p-3 py-1 ' >

                    <h1 className='font-light text-[1.5rem] font-mono  ' > PROCESS PDF</h1>
                    <input className=' text-center border-none font-mono ' type="text" id='url' placeholder="Path" onChange={(e) => { HandleChange(e) }} />
                    <button onClick={HandleProcess} className='bg-blue-700/40 font-sans text-[1.5rem] px-8 py-2 text-white rounded border-none  ' > Process </button>
                    <p className='text-[18px] font-mono ' >{loading} </p>
                </div>
            </Html>
        </>
    )
}

export default ProcessML