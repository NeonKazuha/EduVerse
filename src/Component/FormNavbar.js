import React from 'react';

const FormNavbar = ({ setActiveForm }) => {
    return (
        <div className="flex justify-center mt-4">
            <button onClick={() => setActiveForm('form1')} className="mx-2 px-4 py-2 bg-indigo-500 -mb-10 text-white 
            rounded-sm text-[30px] border-none shadow-lg ">Assigment</button>
            <button onClick={() => setActiveForm('form2')} className="mx-2 px-4 py-2  bg-indigo-500 -mb-10 text-white 
            rounded-sm text-[30px] border-none shadow-lg  ">Material</button>
            <button onClick={() => setActiveForm('form3')} className="mx-2 px-4 py-2 border-none shadow-lg -mb-10    bg-indigo-500 text-white 
            rounded-sm text-[30px] ">Model</button>
            {/* Add more buttons for other forms */}
        </div>
    );
};

export default FormNavbar;