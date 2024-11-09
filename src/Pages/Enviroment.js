import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress, Html } from '@react-three/drei';
import { Suspense } from 'react';
import Products from "../Products/Products";
import Sidebar from '../Component/Sidebar.js';
import VoiceChat from './VoiceChat.js';
import Experience from "../Experience.js";
import { KeyboardControls, Sky } from '@react-three/drei';
import { Controllers, Hands, XR, VRButton } from '@react-three/xr';
import MenuOffice from '../Component/MenuOffice.js';
import MenuClass from '../Component/MenuClass.js';
import SelectiveRender from '../Component/SelectiveRender.js';
import SelectiveRenderClass from '../Component/SelectiveRenderClass.js';
import ConnectMetamask from './ConnectMetamask.js';
import AskaiInput from '../Component/AskaiInput.js';
import UpMenu from '../Component/UpMenu.js';
import Authorize from '../Component/Authorize.js'; // Assuming this is the correct import
import Cloths from '../Products/Cloths.js';
import Showcase from './Showcase.js';
import SelectiveRenderTeacher from '../Component/SelectiveRenderTeacher.js';
import DoubtPanel from '../Component/DoubtPanel.js';
import AttendanceManager from '../Component/AttendanceManager.js';
import AskQuestionAlert from './AskQuestionAlert.js';
import SelectiveRenderPresenter from '../Component/SelectiveRenderPresenter.js';
import ProfileManager from '../Component/ProfileManager.js';
import MenuConferenceHall from '../Component/MenuConferenceHall.js';
import QuestMenu from '../Component/QuestMenu.js';
import QuestNotification from '../Component/QuestNotification.js';
import GlobalChatButton from '../Component/GlobalChatButton.js';
import ConnectAptos from './ConnectAptos.js';
import { ModSimulator } from '../Component/ModSimulator.js';

const Loader = ({ onLoaded }) => {
    const { progress, item, loaded, total } = useProgress();

    if (progress === 100) {
        onLoaded();
    }

    return (
        <Html center>
            <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] z-[10000] text-white font-sans">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-xl font-semibold mb-2 text-black">Loading {Math.round(progress)}%</p>

                <div className="w-64 bg-gray-300 rounded-full h-3 mb-2">
                    <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <p className="text-sm mb-2">{loaded}/{total} files loaded</p>

                {item ? (
                    <p className=" mt-1 text-black " style={{
                        fontSize: "14px"
                    }}>Loading: {item}</p>
                ) : (
                    <p className="text-sm mt-1 text-black">Loading: Initializing assets...</p>
                )}
            </div>
        </Html>
    );
};



const CharacterSelectMenu = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isMenuVisible, setIsMenuVisible] = useState(true); // State to control menu visibility

    const handleMouseEnter = (character) => {
        setSelectedCharacter(character);
    };

    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
        setIsMenuVisible(false); // Hide menu when a character is selected
    };

    if (!isMenuVisible) {
        return null; // Don't render the menu if it's not visible
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[9999]">
            <div className="grid grid-cols-5 bg-white rounded-sm w-1/2 h-auto">
                <div
                    className="col-span-3 flex items-center justify-center border rounded-sm bg-cover bg-center"
                    style={{
                        backgroundImage: selectedCharacter
                            ? `url(${selectedCharacter.image})`
                            : "url('https://i.pinimg.com/originals/31/b8/e4/31b8e491bddc127331560c20b0a33fda.gif')",
                        backgroundPosition: selectedCharacter ? 'center top' : 'center center',
                    }}
                >
                    {selectedCharacter ? (
                        <img src={selectedCharacter.image} alt={selectedCharacter.name} className="w-64 h-64 hidden" />
                    ) : (
                        <p className="text-xl font-semibold text-white">Select a character</p>
                    )}
                </div>
                <div className="col-span-2 grid grid-rows-2">
                    <div
                        className="flex flex-col items-center border hover:scale-110 duration-300 transition-all ease-in-out rounded-sm p-0 cursor-pointer bg-cover bg-center"
                        onMouseEnter={() => handleMouseEnter({
                            name: 'Character 1',
                            image: 'https://i.pinimg.com/originals/31/b8/e4/31b8e491bddc127331560c20b0a33fda.gif'
                        })}
                        onClick={() => handleCharacterSelect({
                            name: 'Character 1',
                            image: 'https://i.pinimg.com/originals/31/b8/e4/31b8e491bddc127331560c20b0a33fda.gif'
                        })}
                        style={{
                            backgroundImage: "url('https://i.pinimg.com/originals/31/b8/e4/31b8e491bddc127331560c20b0a33fda.gif')",
                            backgroundPosition: 'center center',
                        }}
                    >
                        <p className="text-xl font-semibold mb-2 text-white">Character 1</p>
                    </div>
                    <div
                        className="flex flex-col items-center border rounded-sm p-4 hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer bg-cover bg-[center_bottom]"
                        onMouseEnter={() => handleMouseEnter({
                            name: 'Character 2',
                            image: 'https://i.pinimg.com/originals/e4/08/b1/e408b16aa9d3fdaa6f9c65a44c4b7f59.gif'
                        })}
                        onClick={() => handleCharacterSelect({
                            name: 'Character 2',
                            image: 'https://i.pinimg.com/originals/e4/08/b1/e408b16aa9d3fdaa6f9c65a44c4b7f59.gif'
                        })}
                        style={{
                            backgroundImage: "url('https://i.pinimg.com/originals/e4/08/b1/e408b16aa9d3fdaa6f9c65a44c4b7f59.gif')",
                            backgroundPosition: 'center top', // Adjusting the position to show the head
                        }}
                    >
                        <p className="text-xl font-semibold mb-2 text-white">Character 2</p>
                    </div>
                </div>
            </div>
        </div>
    );
};



const Enviroment = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCharacterSelectVisible, setIsCharacterSelectVisible] = useState(false);

    const handleLoaderFinish = () => {
        setIsLoaded(true);
        setIsCharacterSelectVisible(true);
    };

    // const response = Authorize(); // Authorization check
    // if (response != null) {
    //     ////console.log("navigate to signup");
    //     // Logic to navigate to signup could be added here, if required
    // }

    return (
        <>
            {isCharacterSelectVisible && <CharacterSelectMenu />}
            <VoiceChat />
            <KeyboardControls
                map={[
                    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
                    { name: 'back', keys: ['ArrowDown', 'KeyS'] },
                    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
                    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
                    { name: 'jump', keys: ['Space'] },
                    { name: 'shift', keys: ['Shift'] },
                ]}
            >
                <ConnectMetamask />
                <MenuOffice />
                <MenuClass />
                <QuestMenu />
                <ConnectAptos/>
                <SelectiveRender />
                <AttendanceManager />
                <AskQuestionAlert />
                <QuestNotification />
                <MenuConferenceHall />
                <ProfileManager />
                <DoubtPanel />
                <SelectiveRenderClass />
                <SelectiveRenderTeacher />
                <SelectiveRenderPresenter />
                {/* <ModSimulator/> */}
                <UpMenu />
                <AskaiInput />
                <Sidebar />
                <Products />
                <GlobalChatButton />
                {/* <Showcase /> */}
                {/* <Cloths /> */}
                <VRButton />
                <Canvas
                    shadows
                    camera={{
                        fov: 45,
                        near: 0.1,
                        far: 100,
                        position: [2.5, 4, 6],
                    }}
                >
                    <Suspense fallback={<Loader onLoaded={handleLoaderFinish} />}>
                        <XR>
                            <Controllers />
                            <Hands />
                            <Sky sunPosition={[0, 100, 1000]} />
                            <Experience />
                        </XR>
                    </Suspense>
                </Canvas>
            </KeyboardControls>
        </>
    );
};

export default Enviroment;
