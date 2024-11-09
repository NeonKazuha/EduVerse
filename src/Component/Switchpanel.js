import React from 'react';
import { useState } from 'react';
const Switchpanel = ({ setActiveForm }) => {
    return (
        <div className="flex z-10 flex-col items-start absolute bottom-0 left-0 mb-2 ml-2">
            <button onClick={() => setActiveForm('form1')} className="mx-1 px-2 py-1 bg-indigo-500 text-white rounded-sm text-[16px] shadow-sm mb-1 border-none">Assigment</button>
            <button onClick={() => setActiveForm('form2')} className="mx-1 px-2 py-1 bg-indigo-500 text-white rounded-sm text-[16px] shadow-sm mb-1 border-none">Material</button>
            <button onClick={() => setActiveForm('form3')} className="mx-1 px-2 py-1 bg-indigo-500 text-white rounded-sm text-[16px] shadow-sm mb-1 border-none">Model</button>
            <button onClick={() => setActiveForm('form4')} className="mx-1 px-2 py-1 bg-indigo-500 text-white rounded-sm text-[16px] shadow-sm mb-1 border-none">Close</button>
            {/* Add more buttons for other forms */}
        </div>
    );
};

export default Switchpanel;
        