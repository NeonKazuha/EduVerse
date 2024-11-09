import { Html } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai';
import OfficeIframe from './OfficeIframe'; import axios from "axios";
import { socket, charactersAtom } from '../Socketmanager'
import { _checkPlugin } from 'gsap/gsap-core';
import SchoolIframe from './SchoolIframe';

const FileSchool = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [url, seturl] = useState("https://invidious.io/");
    const [message, setmessage] = useState(null)
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);


    // if (character.url != "") { seturl(character.url) }
    ////console.log(url);
    const [characters] = useAtom(charactersAtom);
    if (characters[0]) {
        if (characters[0].url != "" && characters[0].url != url) {
            seturl(characters[0].url);
        }
        // if (characters[0].url != "" && characters[0].url != url) { seturl(characters[0].url) }
        // ////console.log(url);
    }
    // ////console.log(me);

    const handleFileChange = (e) => {
        const file = e.target.value;
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        // Perform upload logic here using selectedFile
        setmessage("Loading...");
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
        if (response.data.outputFilePath) {
            setmessage("File uploaded");
            seturl(`http://localhost:3002/${response.data.filename}`);
            ////console.log(url);
            const joiner = response.data.filename;
            ////console.log(joiner);
            ////console.log("http://localhost:3002/" + joiner);
            const final = "http://localhost:3002/" + joiner
            socket.emit("url", final);
            // ////console.log(url);
            setShow(true);
            setLoading(false);
        }
    };
    return (
        <>
            <Html occlude={"blending"} transform
                scale={0.15} rotation-y={(Math.PI) * 3 / 5}
                position={[65, 2.5, -2]

                }

                zIndexRange={[10, 3]} >
                <div className='w-auto py-4 h-auto font-sans text-[10px] border-gray-800 border-[1px] px-6  gap-4 text-center flex flex-col bg-cyan-400/45 backdrop-blur-sm    '>
                    <label htmlFor="path" className='text-pretty text-slate-700 -mb-3 text-[20px]'  >Enter the path to pdf</label>
                    <input type="text" id='path' className='h-4 text-[14px] border-[3px] border-black/30 p-3' name='upload' onChange={handleFileChange} />
                    <button className=' bg-blue-500 text-white px-2 py-1 hover:bg-white hover:text-gray-700 border-[1px] 
            text-[15px]
            rounded-sm transition-all ' onClick={handleUpload}>Upload</button>
                </div>
                {message}
            </Html >
            {/* <OfficeIframe url={""} /> */}
            {!show && loading}
            {/* {<OfficeIframe url={url} />} */}
            {<SchoolIframe url={url} />}
            {/* <OfficeIframe url={url} /> */}
        </>
    )
}

export default FileSchool