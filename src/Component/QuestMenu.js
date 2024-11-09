import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { OfficeMenuatom } from '../Utils/OfficeMenuatom';
import { socket } from '../Socketmanager';
import { charactersAtom } from '../Socketmanager';
import { QuestMenuAtom } from '../Utils/QuestMenuAtom';

const QuestMenu = () => {
    const [showmenu, setShowMenu] = useState(true);
    let Me = null;
    const [characters] = useAtom(charactersAtom);
    characters.map((char) => {
        if (char.id === socket.id) {
            Me = char;
        }
    });

    const [questmenu, setquestMenu] = useAtom(QuestMenuAtom);
    const [show, setShow] = useState(true);
    const [customQuestForm, setCustomQuestForm] = useState(false); // To control custom quest form display
    const [selectedQuestType, setSelectedQuestType] = useState(''); // To keep track of selected quest type

    // State for quest form data
    const [questData, setQuestData] = useState({
        name: '',
        description: '',
        goal: '',
        currentAmount: '',
        totalParticipants: '',
        currentParticipants: '',
        subject: '', // For Study Group Quest
        numberOfStudents: '', // For Study Group Quest
        deadline: '',
        rewardType: '', // To keep track of reward type
        rewardDetails: '', // Details about the reward
        rewardAmount: '', // New input for reward amount
    });

    const handleViewClick = () => {
        setquestMenu(false);
        setShow(false);
    };

    const handleCustomClick = () => {
        setCustomQuestForm(true); // Show custom quest form
    };

    const handleQuestButtonClick = (questType) => {
        setSelectedQuestType(questType);
        setCustomQuestForm(true); // Open the custom quest form
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmitCustomQuest = (e) => {
        e.preventDefault(); // Prevent page reload
        const newQuest = {
            questId: Date.now().toString(), // Unique identifier (for demo purposes)
            creator: {
                userId: Me.id,
                username: Me.username,
            },
            date: {
                created: new Date().toISOString().split('T')[0], // Current date
                deadline: questData.deadline,
            },
            name: questData.name,
            description: questData.description,
            type: selectedQuestType,
            status: 'upcoming', // Default status
            ...(selectedQuestType === 'Crowdfunding' && {
                crowdfunding: {
                    goal: parseFloat(questData.goal),
                    currentAmount: parseFloat(questData.currentAmount),
                    contributors: [],
                }
            }),
            ...(selectedQuestType === 'Hackathon' && {
                hackathon: {
                    totalParticipants: parseInt(questData.totalParticipants),
                    currentParticipants: parseInt(questData.currentParticipants),
                    participantsList: [],
                }
            }),
            ...(selectedQuestType === 'Study Group' && {
                studyGroup: {
                    subject: questData.subject,
                    numberOfStudents: parseInt(questData.numberOfStudents),
                }
            }),
            reward: {
                type: questData.rewardType, // Now getting reward type from form
                details: questData.rewardDetails, // Now getting reward details from form
                amount: questData.rewardAmount, // New reward amount
            },
            visibility: 'public', // Default visibility
            tags: [], // Optional tags
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        socket.emit('createQuest', newQuest); // Emit event to server
        setCustomQuestForm(false); // Hide form after submission

        setQuestData({
            name: '',
            description: '',
            goal: '',
            currentAmount: '',
            totalParticipants: '',
            currentParticipants: '',
            subject: '',
            numberOfStudents: '',
            deadline: '',
            rewardType: '',
            rewardDetails: '',
            rewardAmount: '', // Reset reward amount
        }); // Reset form data
        setSelectedQuestType(''); // Reset selected quest type
    };

    return (
        <>
            {show && (
                <>
                    {questmenu && !customQuestForm && (
                        <div className='text-[10px] absolute bottom-[3rem] right-52 z-10 w-[10rem] transition-all'>
                            <button
                                className="px-3 py-1 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white 
                                text-[20px] font-extralight active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={handleViewClick}
                            >
                                Start Quest
                            </button>
                            <button
                                className="px-3 py-1 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white font-extralight text-[20px] active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={handleCustomClick}
                            >
                                Custom Quest
                            </button>
                            <button
                                className="px-3 py-1 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white font-extralight text-[20px] active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => handleQuestButtonClick('Mentorship')}
                            >
                                Mentorship Quest
                            </button>
                            <button
                                className="px-3 py-1 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white font-extralight text-[20px] active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => handleQuestButtonClick('Hackathon')}
                            >
                                Hackathon Quest
                            </button>
                            <button
                                className="px-3 py-1 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white font-extralight text-[20px] active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => handleQuestButtonClick('Debate')}
                            >
                                Debate Quest
                            </button>
                            <button
                                className="px-3 py-1 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white font-extralight text-[20px] active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => handleQuestButtonClick('Research')}
                            >
                                Research Quest
                            </button>
                            <button
                                className="px-3 py-1 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white font-extralight text-[20px] active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => handleQuestButtonClick('Community Service')}
                            >
                                Community Service Quest
                            </button>
                            <button
                                className="px-3 py-1 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white font-extralight text-[20px] active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => handleQuestButtonClick('Study Group')}
                            >
                                Study Group Quest
                            </button>
                            <button
                                className="px-3 py-1 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white font-extralight text-[20px] active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                                onClick={() => handleQuestButtonClick('Crowdfunding')}
                            >
                                Crowdfunding Quest
                            </button>
                        </div>
                    )}

                    {customQuestForm && (
                        <div className="fixed z-50 scale-[0.6] left-[14rem] inset-0 flex items-center justify-center">
                            <div className="bg-white p-4 rounded shadow-md">
                                <h2 className="font-semibold text-lg">{`Create ${selectedQuestType} Quest`}</h2>
                                <QuestForm
                                    type={selectedQuestType}
                                    questData={questData}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmitCustomQuest}
                                    setCustomQuestForm={setCustomQuestForm}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

const QuestForm = ({ type, questData, handleChange, handleSubmit, setCustomQuestForm }) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <input
                name="name"
                type="text"
                className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                placeholder="Quest Name"
                value={questData.name}
                onChange={handleChange}
                required
            />
            <input
                name="description"
                type="text"
                className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                placeholder="Quest Description"
                value={questData.description}
                onChange={handleChange}
                required
            />
            <input
                name="deadline"
                type="date"
                className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                placeholder="Deadline"
                value={questData.deadline}
                onChange={handleChange}
                required
            />
            {type === 'Crowdfunding' && (
                <>
                    <input
                        name="goal"
                        type="number"
                        className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                        placeholder="Funding Goal"
                        value={questData.goal}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="currentAmount"
                        type="number"
                        className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                        placeholder="Current Amount Raised"
                        value={questData.currentAmount}
                        onChange={handleChange}
                        required
                    />
                </>
            )}
            {type === 'Hackathon' && (
                <>
                    <input
                        name="totalParticipants"
                        type="number"
                        className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                        placeholder="Total Participants Needed"
                        value={questData.totalParticipants}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="currentParticipants"
                        type="number"
                        className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                        placeholder="Current Participants"
                        value={questData.currentParticipants}
                        onChange={handleChange}
                        required
                    />
                </>
            )}
            {type === 'Study Group' && (
                <>
                    <input
                        name="subject"
                        type="text"
                        className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                        placeholder="Subject"
                        value={questData.subject}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="numberOfStudents"
                        type="number"
                        className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                        placeholder="Number of Students Required"
                        value={questData.numberOfStudents}
                        onChange={handleChange}
                        required
                    />
                </>
            )}
            <select
                name="rewardType"
                className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                value={questData.rewardType}
                onChange={handleChange}
                required
            >
                <option value="">Select Reward Type</option>
                <option value="badge">Badge</option>
                <option value="NFT">NFT</option>
                <option value="Token">Token</option>
            </select>
            <input
                name="rewardDetails"
                type="text"
                className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                placeholder="Details about the Reward"
                value={questData.rewardDetails}
                onChange={handleChange}
                required
            />
            <input
                name="rewardAmount"
                type="number"
                className="bg-gray-100 border border-gray-300 p-2 mb-2 outline-none"
                placeholder="Reward Amount"
                value={questData.rewardAmount} // New input for reward amount
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                className="bg-indigo-500 text-lg rounded-md text-white py-2 px-4 hover:bg-indigo-600 transition duration-200"
            >
                Create Quest
            </button>
            <div
                onClick={() => setCustomQuestForm(false)}
                className="btn border border-red-500 p-1 px-3 font-semibold cursor-pointer text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200 ml-2"
            >
                Cancel
            </div>
        </form>
    );
};

export default QuestMenu;