import { Html } from '@react-three/drei'
import React, { useState } from 'react'
import OfficeIframe from './OfficeIframe'; import axios from "axios";
const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [downloaded, setDownlaoded] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleFileChange = (e) => {
        const file = e.target.value;
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        // Perform upload logic here using selectedFile

        if (selectedFile) {
            ////console.log('Uploading file', selectedFile);
            // Example: uploadFile(selectedFile);   
        } else {
            ////console.log('No file selected.');
        }


        const response = await axios.post('http://localhost:3002/api/v1/user/upload', {
            path: selectedFile
        })

        ////console.log(response.data.outputFilePath);
    };
    return (
        <div className='w-auto py-4 h-auto font-sans text-[10px] border-gray-800 border-[1px] px-6  gap-4 text-center flex flex-col bg-cyan-400/45 backdrop-blur-sm    '>
            <label htmlFor="path" className='text-pretty text-slate-700 -mb-3 text-[20px]'  >Enter the path to pdf</label>
            <input type="text" id='path' className='h-4 text-[14px] border-[3px] border-black/30 p-3' name='upload' onChange={handleFileChange} />
            <button className=' bg-blue-500 text-white px-2 py-1 hover:bg-white hover:text-gray-700 border-[1px] 
            text-[15px]
            rounded-sm transition-all ' onClick={handleUpload}>Uploddad</button>
        </div>)
}

export default Upload