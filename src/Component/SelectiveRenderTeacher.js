import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Findme } from '../Utils/Findme';
import TeacherContentbox from './TeacherContentbox';

const SelectiveRenderTeacher = () => {
    const [me] = useAtom(Findme);
    const [showContent, setShowContent] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        if (me && me.role === 'teacher') {
            setIsTeacher(true);
        } else {
            setIsTeacher(false);
        }
    }, [me]);

    const toggleContent = () => {
        setShowContent(prevShowContent => !prevShowContent);
    };

    return (
        <>
            {isTeacher && (
                <div className="flex justify-center absolute z-40 mt-4">
                    <button
                        onClick={toggleContent}
                        className="btn border absolute z-10 left-0 top-60 rounded-sm text-[20px] px-1 border-indigo-500  font-semibold cursor-pointer text-gray-200 bg-indigo-500"
                    > 
                        {showContent ? 'Close' : 'Menu'}
                    </button>
                </div>
            )}
            {showContent && <TeacherContentbox />}
        </>
    );
};

export default SelectiveRenderTeacher;