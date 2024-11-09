import React, { useState } from 'react';
import { socket } from '../Socketmanager';
import axios from 'axios';

const UploadOfficeMaterial = () => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [file, setFile] = useState(null);
    const [status, setstatus] = useState(null);
    const [load, setLoad] = useState(false);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async () => {
        ////console.log("Title:", title);
        ////console.log("Link:", link);
        ////console.log("File:", file);

        // Add code to handle form submission (e.g., send data to backend)
        setLoad(true);
        setstatus("Loading...")
        const response = await axios.post('http://localhost:3002/api/v1/user/upload', {
            path: link

        })
        setstatus("Posted")
        const name = response.data.filename;
        ////console.log(name[0])
        ////console.log("hihi")
        const url = "http://localhost:3002/" + name[0];
        ////console.log(url);
        socket.emit("material", {

            title: title,
            link: url,
        });


    };

    return (
        <div className="bg-white shadow p-4 py-8">
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">Information</div>
            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                <input
                    className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    spellCheck="false"
                    onChange={handleTitleChange}
                    value={title}
                    placeholder="Title"
                    type="text"
                />
                <input
                    className="link bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    spellCheck="false"
                    onChange={handleLinkChange}
                    value={link}
                    placeholder="Link"
                    type="text"
                />
                <div className="icons flex text-gray-500 m-2">
                    <label>
                        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <input hidden type="file" onChange={handleFileChange} />
                    </label>
                    <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                </div>
                <div className="buttons flex justify-end">
                    {load && <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">{status}</div>}
                    <div onClick={handleSubmit} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div>
                </div>
            </div>
        </div>
    );
};

export default UploadOfficeMaterial;
