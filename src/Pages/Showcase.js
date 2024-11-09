import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Distanceto from '../Component/Distanceto';

const Showcase = () => {
    const [showButton, setShowButton] = useState(false);
    const [showInventory, setShowInventory] = useState(false);
    const distance = Distanceto([33.55678793594416, -0.9, 10.214425307565293]);

    if (distance && !showButton) {
        setShowButton(true);
    } else if (!distance && showButton) {
        setShowButton(false);
    }

    const toggleInventory = () => {
        setShowInventory(!showInventory);
    };

    const handleItemClick = (itemName) => {
        const loadingToast = toast.loading('Loading...');

        setTimeout(() => {
            toast.dismiss(loadingToast); // Dismiss the loading toast
            toast.success(`${itemName} Deployed`);
        }, 2000); // 2 second delay to simulate loading time
    };

    return (
        <>
            <div className='text-[10px] absolute top-[10rem] right-[10vw] z-10 w-[10rem] mx-auto h-[1.4rem] transition-all'>
                {showButton && (
                    <button
                        className="px-4 py-2 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white 
                        text-[30px] font-extralight active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        onClick={toggleInventory}
                    >
                        Showcase
                    </button>
                )}
            </div>

            {showInventory && (
                <div className='absolute top-[14rem] right-[10vw] z-20 w-[10rem] bg-transparent/25 border-2 border-white/35 rounded p-4 text-white'>
                    <h2 className="text-[20px] font-semibold mb-2">Inventory</h2>
                    <ul>
                        <li className="mb-2">
                            <button
                                className="w-full px-4 py-2 bg-transparent/25 outline-none border-none rounded text-white 
                                text-[18px] font-light active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                                onClick={() => handleItemClick('Bugatti')}
                            >
                                Bugatti
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full px-4 py-2 bg-transparent/25 outline-none border-none rounded text-white 
                                text-[18px] font-light active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                                onClick={() => handleItemClick('Sports Car')}
                            >
                                Sports Car
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            {/* Add Toaster component to show toast notifications */}
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: '10px',
                    },
                }}
                position="top-right"
                reverseOrder={false}
            />
        </>
    );
};

export default Showcase;
