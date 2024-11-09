import React from 'react';

const OfficeContentNavbar = ({ setActiveForm }) => {
    return (
        <div className="flex justify-center mt-4">
            <button onClick={() => setActiveForm('form1')} className="mx-2 px-4 py-2 bg-indigo-500 -mb-10 text-white 
            rounded-sm text-[30px] border-none shadow-lg ">Information</button>
            <button onClick={() => setActiveForm('form2')} className="mx-2 px-4 py-2  bg-indigo-500 -mb-10 text-white 
            rounded-sm text-[30px] border-none shadow-lg  ">Model</button>
           
            {/* Add more buttons for other forms */}
        </div>
    );
};

export default OfficeContentNavbar;