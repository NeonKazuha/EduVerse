import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import io from "socket.io-client";
import { socket } from "../Socketmanager";


const NewsIframe = () => {
    const [events, setEvents] = useState([]);
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        socket.on("updateEvents", (updatedEvents) => {
            setEvents(updatedEvents);
        });

        socket.on("updateQuests", (updatedQuests) => {
            setQuests(updatedQuests);
        });

        return () => {
            socket.off("updateEvents");
            socket.off("updateQuests");
        };
    }, []);

    const renderQuestDetails = (quest) => {
        switch (quest.type) {
            case "Crowdfunding":
                return (
                    <>
                        <p className="text-xs">
                            <strong>Goal:</strong> {quest.crowdfunding.goal}
                        </p>
                        <p className="text-xs">
                            <strong>Current Amount:</strong> {quest.crowdfunding.currentAmount}
                        </p>
                        <progress
                            value={quest.crowdfunding.currentAmount}
                            max={quest.crowdfunding.goal}
                            className="w-full"
                        ></progress>
                    </>
                );
            case "Hackathon":
                return (
                    <>
                        <p className="text-xs">
                            <strong>Total Participants Needed:</strong> {quest.hackathon.totalParticipants}
                        </p>
                        <p className="text-xs">
                            <strong>Current Participants:</strong> {quest.hackathon.currentParticipants}
                        </p>
                    </>
                );
            case "Study Group":
                return (
                    <>
                        <p className="text-xs">
                            <strong>Subject:</strong> {quest.studyGroup.subject}
                        </p>
                        <p className="text-xs">
                            <strong>Number of Students Required:</strong> {quest.studyGroup.numberOfStudents}
                        </p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Html
            position={[48.57288828590144, 3, -40.022221541393286]}
            rotation={[0, 0, 0]}
            transform
            scale={0.6}
            occlude={"blending"}
            zIndexRange={[10, 1]}
        >
            <div className="flex flex-col items-center justify-start p-4 bg-white rounded-lg shadow-lg w-full h-full max-h-96 overflow-y-auto">
                <h1 className="text-xl font-bold mb-4 text-center text-gray-800">
                    Current Events & Quests
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {/* Event List */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">
                            Scheduled Events
                        </h2>
                        {events.length > 0 ? (
                            <ul className="space-y-2">
                                {events.map((event, index) => (
                                    <li
                                        key={index}
                                        className="border p-2 rounded-md bg-blue-50 border-blue-200 text-xs"
                                    >
                                        <p className="font-medium text-gray-800">
                                            {event.name} - {new Date(event.time).toLocaleString()}
                                        </p>
                                        <p className="text-gray-600">Location: {event.location}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-xs">No events scheduled.</p>
                        )}
                    </div>

                    {/* Quest List */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">
                            Available Quests
                        </h2>
                        {quests.length > 0 ? (
                            <ul className="space-y-2">
                                {quests.map((quest, index) => (
                                    <li
                                        key={index}
                                        className="border p-2 rounded-md bg-green-50 border-green-200 text-xs"
                                    >
                                        <p className="font-medium text-gray-800">
                                            {quest.name} - Created by: {quest.creator.username}
                                        </p>
                                        <p className="text-gray-600">Status: {quest.status}</p>
                                        {renderQuestDetails(quest)}
                                        <p className="text-green-500">
                                            Reward: {quest.reward.type} - {quest.reward.details}
                                        </p>
                                        <p className="text-gray-400">
                                            Deadline: {new Date(quest.date.deadline).toLocaleDateString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-xs">No quests available.</p>
                        )}
                    </div>
                </div>
            </div>
        </Html>
    );
};

export default NewsIframe;