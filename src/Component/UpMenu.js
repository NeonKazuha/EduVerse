import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { OfficeMenuatom } from '../Utils/OfficeMenuatom';
import { socket } from '../Socketmanager';
import { charactersAtom } from '../Socketmanager';
import { ClassMenuatom } from '../Utils/ClassMenuatom';
import { GoupAtom } from '../Utils/GoUP';
import { Findme } from '../Utils/Findme';
// import { upAtom } from '../Utils/upatom';
const UpMenu = () => {
    // const showMenu
    const [showmenu, setShowMenu] = useState(false)
    const [me] = useAtom(Findme);
    // const [_up,setup] = useState(upAtom)
    let x = 0;
    let y = 0;
    let z = 0;
    if (me != null) {

        // ////console.log(me); 
        // ////console.log(me.position)    
        x = me.position[0]
        y = me.position[1]
        z = me.position[2]

    }
    // ////console.log(x, y, z)
    const [up] = useAtom(GoupAtom)
    let Me = null;
    const [characters] = useAtom(charactersAtom);
    characters.map((char) => {
        if (char.id == socket.id) { Me = char }
    })



    const [_classMenu, setClassMenu] = useAtom(ClassMenuatom);
    const [show, setShow] = useState(true);
    const handleViewClick = () => {
        // Handle logic for View button click
        // setup(true);
        socket.emit('position', {
            x: x,
            y: 1.5
            ,
            z: z,
        });
    };

    const handleOtherClick = () => {

        setShow(false);
        socket.emit('position', {
            x: x,
            y: 3,
            z: z,
        });


    };

    return (
        <>{show && <>
            {up && (
                <div className='text-[10px] absolute bottom-[14rem] right-52 z-10 w-[10rem] mx-auto h-[1.4rem] transition-all'>
                    <button
                        className="px-4 py-2 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white 
                        text-[30px] font-extralight active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        onClick={handleViewClick}
                    >
                        Present
                    </button>

                </div>
            )}


        </>}

        </>
    );
};

export default UpMenu;
