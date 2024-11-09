import React, { useState } from 'react';
import { socket } from '../Socketmanager';

const AssignmentCreator = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleDueDateChange = (e) => setDueDate(e.target.value);

    const handleSubmit = () => {
        ////console.log(title, description, dueDate);
        socket.emit("assignment", { title, description, dueDate });
    };

    return (
        <div className=" shadow p-4 py-8">
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800 ">New Assignment</div>
            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border bg-white border-gray-300 p-4 shadow-lg max-w-2xl">
                <input
                    className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    spellCheck="false"
                    onChange={handleTitleChange}
                    placeholder="Title"
                    type="text"
                />
                <textarea
                    className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                    spellCheck="false"
                    onChange={handleDescriptionChange}
                    placeholder="Description of the Assignment"
                />
                <input
                    className="due-date bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    type="date"
                    value={dueDate}
                    onChange={handleDueDateChange}
                />
                <div className="buttons flex justify-end">
                    <div onClick={handleSubmit} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentCreator;