import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { charactersAtom, socket } from '../Socketmanager';
import { ClassMenuatom } from '../Utils/ClassMenuatom';

const MenuClass = () => {
    const [characters] = useAtom(charactersAtom);
    const [_classMenu, setClassMenu] = useAtom(ClassMenuatom);
    const [show, setShow] = useState(true);
    const [role, setRole] = useState(null);
    const [className, setClassName] = useState('');
    const [classTime, setClassTime] = useState('');
    const [classes, setClasses] = useState([]);

    let Me = characters.find(char => char.id === socket.id);

    useEffect(() => {
        socket.on('updateClasses', (newClasses) => {
            console.log('Received updated classes:', newClasses);
            setClasses(newClasses);
        });

        return () => {
            socket.off('updateClasses');
        };
    }, []);

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        socket.emit("role", selectedRole)
        if (selectedRole === 'student') {
            setClassMenu('join');
        } else {
            setClassMenu(true);
        }
    };

    const handleCreateClass = () => {
        const newClass = { name: className, time: classTime, attendees: [] };
        socket.emit('createClass', newClass);
        setClassName('');
        setClassTime('');
        setClassMenu(false);
    };

    const handleJoinClass = (classToJoin) => {
        const updatedClass = { ...classToJoin, attendees: [...classToJoin.attendees, Me.id] };
        socket.emit('joinClass', { characterId: Me.id, class: updatedClass });
        setClassMenu(false);
        setShow(false);
    };

    return (
        <>
            {show && (
                <div className="absolute bottom-40 right-40 z-10 w-24 transition-all">
                    {!role && _classMenu && (
                        <div className="flex flex-col space-y-1">
                            <button
                                className="px-2 py-1 bg-transparent bg-opacity-25 outline-none border-2 border-white border-opacity-35 rounded text-white 
                                text-sm font-light active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => handleRoleSelect('teacher')}
                            >
                                Teacher
                            </button>
                            <button
                                className="px-2 py-1 bg-transparent bg-opacity-25 outline-none border-2 border-white border-opacity-35 rounded text-white 
                                text-sm font-light active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => handleRoleSelect('student')}
                            >
                                Student
                            </button>
                        </div>
                    )}

                    {role === 'teacher' && _classMenu === true && (
                        <div className="flex flex-col space-y-1">
                            <button
                                className="px-2 py-1 bg-transparent bg-opacity-25 outline-none border-2 border-white border-opacity-35 rounded text-white 
                                text-sm font-light active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => setClassMenu('create')}
                            >
                                Create Class
                            </button>
                            <button
                                className="px-2 py-1 bg-transparent bg-opacity-25 outline-none border-2 border-white border-opacity-35 rounded text-white 
                                text-sm font-light active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => setClassMenu('join')}
                            >
                                Join Class
                            </button>
                        </div>
                    )}

                    {_classMenu === 'create' && (
                        <div className="flex flex-col space-y-2 bg-white bg-opacity-20 p-2 rounded">
                            <input
                                type="text"
                                placeholder="Class Name"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                className="px-2 py-1 rounded text-black text-xs"
                            />
                            <input
                                type="datetime-local"
                                value={classTime}
                                onChange={(e) => setClassTime(e.target.value)}
                                className="px-2 py-1 rounded text-black text-xs"
                            />
                            <button
                                onClick={handleCreateClass}
                                className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 transition-colors duration-200"
                            >
                                Create Class
                            </button>
                        </div>
                    )}

                    {_classMenu === 'join' && (
                        <div className="flex flex-col space-y-2 bg-white bg-opacity-20 p-2 rounded max-h-40 overflow-y-auto text-xs">
                            {classes.map((classItem, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleJoinClass(classItem)}
                                    className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200 text-xs"
                                >
                                    {classItem.name} - {classItem.time}
                                    {classItem.attendees.length > 0 ? ` (Attendees: ${classItem.attendees.length})` : ''}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MenuClass;