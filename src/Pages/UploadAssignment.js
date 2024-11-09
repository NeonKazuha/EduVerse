import React, { useState } from 'react';
import { socket } from '../Socketmanager';
const UploadAssignment = () => {
    const [images, setImages] = useState([]);
    const [dueDate, setDueDate] = useState('');
    const [title, setTitle] = useState('');
    const [discription, setdiscription] = useState('');

    const HandleOnTitlechange = (e) => {

        setTitle(e.target.value);
    }
    const HandleOnDiscriptionchange = (e) => {
        setdiscription(e.target.value);
    }


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).map(file => ({
            url: URL.createObjectURL(file),
            name: file.name,
            preview: ['jpg', 'jpeg', 'png', 'gif'].includes(file.name.split('.').pop().toLowerCase()),
            size: file.size > 1024
                ? file.size > 1048576
                    ? Math.round(file.size / 1048576) + 'mb'
                    : Math.round(file.size / 1024) + 'kb'
                : file.size + 'b'
        }));
        setImages(files);
    };

    const handleImageRemove = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const handleSubmit = () => {

        ////console.log(title, discription, dueDate)
        // Handle form submission (e.g., send data to backend)
        socket.emit("assignment", {

            title: title,
            discription: discription,
            dueDate: dueDate
        });


        ////console.log("Submitting form data:", { dueDate });
    };

    return (
        <div className="bg-white shadow p-4 py-8">
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">New Assignment</div>
            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" onChange={(e) => (HandleOnTitlechange(e))} placeholder="Title" type="text" />
                <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" onChange={(e) => (HandleOnDiscriptionchange(e))} placeholder="Dricription of the Assignment"></textarea>

                {/* Due Date Field */}
                <input
                    className="due-date bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    type="date"
                    value={dueDate}
                    onChange={handleDueDateChange}
                />

                {/* icons */}
                <div className="icons flex text-gray-500 m-2">
                    <label id="select-image">
                        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <input hidden type="file" multiple onChange={handleImageChange} />
                    </label>
                    <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                </div>

                {/* Preview image here */}
                <div id="preview" className="my-4 flex">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-32 h-32 object-cover rounded">
                            {image.preview ? (
                                <img src={image.url} alt={image.name} className="w-32 h-32 object-cover rounded" />
                            ) : (
                                <svg className="fill-current w-32 h-32 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                </svg>
                            )}
                            <button onClick={() => handleImageRemove(index)} className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"><span className="mx-auto">×</span></button>
                            <div className="text-xs text-center p-2">{image.size}</div>
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="buttons flex justify-end">
                    <div onClick={handleSubmit} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div>
                </div>
            </div>
        </div>
    );
};

export default UploadAssignment;