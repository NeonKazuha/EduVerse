import React, { useState } from 'react';
import { ARButton, XR } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import XrCube from './XrCube';
import toast, { Toaster } from 'react-hot-toast';
import { useAtom } from 'jotai';
import { PlayerXP } from '../Utils/PlayerXP';
import { useBuyItem } from '../Component/useBuyItem';  // Import the hook
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import "./Xr.css"; // Assuming you have other styles here
import { burn1, getBalancePerson } from '../Component/AptosFunctions';

export default function XrContainer(props) {
    const { account, signAndSubmitTransaction } = useWallet();

    const [xp, setXP] = useAtom(PlayerXP);
    const [showDetails, setShowDetails] = useState(false);
    const [orderMessage, setOrderMessage] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showAR, setShowAR] = useState(false); // State to handle Enter AR popup
    const { buyItem } = useBuyItem();  // Get the buyItem function from the hook

    // Function to toggle between showing the Canvas and the details popup
    const toggleDetails = () => {
        setShowDetails(!showDetails);
        setOrderMessage(''); // Clear message when closing the details
        setOrderPlaced(false); // Reset the order placed state
    };
    const handleBuyClick = async (currency) => {
        const loadingToast = toast.loading('Please wait...');

        try {
            // Await the burn1 function result and check if it succeeds
            const isBurnSuccessful = await burn1(account, signAndSubmitTransaction, currency);

            if (isBurnSuccessful) {
                // Call getBalancePerson when burn1 is successful
                await getBalancePerson(account);

                setOrderMessage('Order Placed Successfully!');
                setOrderPlaced(true);
                toast.success('Order Placed Successfully!');

                // Increment XP and show success message for leveling up
                setXP(xp + 1);
                toast.success('Leveled UP!');
            } else {
                toast.error('Purchase Failed');
            }
        } catch (error) {
            console.error("Error during purchase:", error);
            toast.error('Purchase Failed');
        } finally {
            // Dismiss the loading toast in both success and failure cases
            toast.dismiss(loadingToast);
        }
    };

    // Function to handle the Buy button click and show toast
    // const handleBuyClick = async (currency) => {
    //     const loadingToast = toast.loading('Please wait...');

    //     const result = await buyItem();  // Use the buyItem function
    //     toast.dismiss(loadingToast); // Dismiss the loading toast

    //     if (result) {
    //         setOrderMessage('Order Placed Successfully!');
    //         setOrderPlaced(true);
    //         toast.success('Order Placed');
    //         setXP(xp + 1);
    //         toast.success('Leveled UP!');
    //     } else {
    //         toast.error('Purchase Failed');
    //     }
    // };

    // Function to render the stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<span key={i} className="text-yellow-400">★</span>);
            } else {
                stars.push(<span key={i} className="text-gray-400">★</span>);
            }
        }
        return stars;
    };

    // Function to toggle AR popup
    const toggleAR = () => {
        setShowAR(!showAR);
    };

    return (
        <>
            <div className="container2">
                <Canvas style={{ width: '600px', height: '500px' }}>
                    {!showDetails ? (
                        <XR>
                            <XrCube url={props.modelSrc} />
                        </XR>
                    ) : null}
                </Canvas>
                {!showDetails ? (
                    <div className="Productinfo mt-2 flex">
                        <button
                            onClick={toggleAR}
                            className="px-4 py-2 bg-blue-800 text-white rounded-md transition-all duration-300 hover:bg-blue-600"
                        >
                            Enter AR
                        </button>
                        <button
                            onClick={toggleDetails}
                            className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-md transition-all duration-300 hover:bg-gray-900"
                        >
                            Details
                        </button>
                    </div>
                ) : null}
            </div>

            {showDetails && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-lg shadow-lg max-w-xs w-full transition-opacity duration-300">
                        <button
                            onClick={toggleDetails}
                            className="absolute top-2 right-2 border-none text-white hover:text-gray-400 text-sm"
                        >
                            &times;
                        </button>

                        {!orderPlaced ? (
                            <>
                                <h2 className="text-lg font-semibold mb-2 text-gray-100">{props.productInfo.name}</h2>
                                <p className="mb-2 text-sm text-gray-200">{props.productInfo.description}</p>
                                <div className="mb-2 text-sm text-gray-200 flex items-center">
                                    <span className="mr-1">Rating:</span> {renderStars(props.productInfo.ratings)}
                                </div>
                                <div className="mt-4 text-[15px] text-gray-300">

                                    <p className="mb-1  text-[15px]">
                                        <span className="font-semibold text-[15px]">Price :</span> {props.productInfo.price.coins} 🪙
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-between">

                                    <button
                                        onClick={() => handleBuyClick(props.productInfo.price.coins)}
                                        className="px-3 py-1 text-[15px] text-white rounded-sm transition-all border border-white duration-300 flex flex-col items-center"
                                    >
                                        <span>Buy</span>
                                        <span className="text-[12px] text-gray-300"> {props.productInfo.price.coins}</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='w-full h-full flex flex-col justify-between items-center'>
                                    <div className="mt-4 p-2 bg-green-500 text-white rounded text-center">
                                        Order Placed Successfully!
                                    </div>
                                    <button
                                        className="mt-4 px-4 py-2  text-[14px]  border-white text-white rounded-sm transition-all duration-300 hover:bg-gray-200 hover:text-black"
                                        onClick={() => alert('Order Details clicked')}
                                    >
                                        Order Details
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {showAR && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
                    <div className="relative bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-lg shadow-lg max-w-lg w-full transition-opacity duration-300">
                        <button
                            onClick={toggleAR}
                            className="absolute top-2 right-2 border-none text-white hover:text-gray-400 text-sm"
                        >
                            &times;
                        </button>
                        {/* AR content with a dummy QR code */}
                        <div className="w-full h-[500px]  mt-4 flex items-center justify-center">
                            <img src="https://i.pinimg.com/736x/a8/69/40/a86940a4ed8a69539b341f3c414c47b3.jpg" alt="QR Code" className="w-[500px] h-fit" />
                        </div>
                    </div>
                </div>
            )}

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
}