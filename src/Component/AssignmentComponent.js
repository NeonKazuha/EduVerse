import React, { useState } from 'react';

const AssignmentComponent = ({ assignment }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="w-[300px] rounded-xl border border-gray-200 bg-white py-4 px-2 shadow-md shadow-gray-100">
            <div className="flex items-center justify-between px-2 text-base font-medium text-gray-700">
                <div onClick={toggleDetails} style={{ cursor: 'pointer' }}>
                    {assignment.title}
                </div>
                {showDetails && (
                    <button onClick={toggleDetails} className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none">
                        Go Back
                    </button>
                )}
            </div>
            {showDetails && (
                <>
                    {/* Render assignment-specific details here */}
                    <div className="mt-4">
                        {/* Pass assignmentId to the UploadFormComponent */}

                    </div>
                    {/* Other assignment details can be added here */}
                </>
            )}
        </div>
    );
};

export default AssignmentComponent;
