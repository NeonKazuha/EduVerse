import React from 'react';
import { socket } from '../Socketmanager';
import { useAtom } from 'jotai';
import { Findme } from '../Utils/Findme';

const AlertMessage = ({ _socketid, userRole, message }) => {
    // const [userRole,setRole]  = useAtom(Findme)

    const HandleResolve = () => {
        if (userRole != null) {
            if (userRole.role === 'teacher' || userRole.role == 'presenter') {
                socket.emit("resolve", _socketid);
            } else {
                ////console.log('Only teachers can resolve doubts.');
            }
        }

    };

    return (
        <div className="flex justify-center items-center m-1 font-medium py-1 px-1 gap-1 rounded-md text-green-700 bg-green-100/30 border border-green-300">
            <div slot="avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle w-2 h-2 mx-2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <div className="text-[11px] font-light max-w-full flex-initial flex flex-row gap-1 align-middle justify-center">
                <p className='text-[12px] font-semibold'>{_socketid}</p> {message}
            </div>
            {userRole != null && (userRole.role === 'teacher' || userRole.role == 'presenter') && (
                <div className="flex flex-auto flex-row-reverse">
                    <button
                        id='id'
                        onClick={HandleResolve}
                        className='px-2 p-[3px] rounded-sm border-[1px] mr-1 hover:text-white justify-end hover:bg-green-900 hover:py-3 transition-all'
                    >
                        Resolve
                    </button>
                </div>
            )}
        </div>
    );
};

export default AlertMessage;