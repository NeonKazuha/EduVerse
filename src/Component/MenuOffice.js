import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { OfficeMenuatom } from '../Utils/OfficeMenuatom';
import { socket } from '../Socketmanager';
import { charactersAtom } from '../Socketmanager';
const MenuOffice = () => {
    // const showMenu
    const [showmenu, setShowMenu] = useState(false)
    let Me = null;
    const [characters] = useAtom(charactersAtom);
    characters.map((char) => {
        if (char.id == socket.id) { Me = char }
    })



    const [_officeMenu, setOfficeMenu] = useAtom(OfficeMenuatom);
    const [show, setShow] = useState(true);
    const handleViewClick = () => {
        // Handle logic for View button click
        ////console.log('View button clicked');
        setOfficeMenu(false);
        socket.emit("role", "presenter")
        setShow(false)
    };

    const handleOtherClick = () => {
        // Handle logic for Other button click
        ////console.log('Other button clicked');
        setOfficeMenu(false);
        setShow(false);
        socket.emit("role", "presentee")


    };

    return (
        <>{show && <>
            {_officeMenu && (
                <div className='text-[10px] absolute bottom-[14rem] right-52 z-10 w-[10rem] mx-auto h-[1.4rem] transition-all'>
                    <button
                        className="px-4 py-2 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white 
                        text-[30px] font-extralight active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        onClick={handleViewClick}
                    >
                        Presenter
                    </button>
                    <button
                        className="px-4 py-2 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white font-extralight text-[30px] active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        onClick={handleOtherClick}
                    >
                        Presentee
                    </button>
                </div>
            )}


        </>}

        </>
    );
};

export default MenuOffice;
