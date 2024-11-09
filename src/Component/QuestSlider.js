import React, { useState, useEffect } from "react";
import { socket } from "../Socketmanager"; // Adjust the path as needed
import toast from "react-hot-toast";
import { Findme } from "../Utils/Findme";
import { useAtom } from "jotai";

const QuestSlider = () => {
  const [quests, setQuests] = useState([]);
  const [Me, setMe] = useAtom(Findme);
  const handleAcceptQuest = (questId) => {
    socket.emit("acceptQuest", {
      questId,
      userId: Me.id,
      username: Me.username,
    });
  };
  const handleApproveParticipant = (questId, userId) => {
    socket.emit("approveParticipant", { questId, userId });
  };

  const handleRejectParticipant = (questId, userId) => {
    socket.emit("rejectParticipant", { questId, userId });
  };
  useEffect(() => {
    socket.on("updateQuests", (updatedQuests) => {
      setQuests(updatedQuests);
    });

    return () => {
      socket.off("updateQuests");
    };
  }, []);
  useEffect(() => {
    // socket.on(
    //   "questParticipantRequest",
    //   ({ questId, questName, userId, username }) => {
    //     toast.info(`${username} wants to join your quest "${questName}"!`, {
    //       position: "top-right",

    //       autoClose: 5000,

    //       hideProgressBar: false,

    //       closeOnClick: true,

    //       pauseOnHover: true,

    //       draggable: true,
    //     });
    //   }
    // );

    socket.on("questParticipationApproved", ({ questId, questName }) => {
      toast.success(`You've been approved to join the quest "${questName}"!`);
    });

    socket.on("questParticipationRejected", ({ questId, questName }) => {
      toast.error(
        `Your request to join the quest "${questName}" was rejected.`
      );
    });

    return () => {
      // socket.off("questParticipantRequest");

      socket.off("questParticipationApproved");

      socket.off("questParticipationRejected");
    };
  }, []);
  useEffect(() => {
    // Listen for quest updates from the server
    socket.on("updateQuests", (updatedQuests) => {
      setQuests(updatedQuests);
    });

    // Request initial quests from the server
    // socket.emit("getQuests");

    // Clean up listeners when component unmounts
    return () => {
      socket.off("updateQuests");
    };
  }, []);

  const renderQuestDetails = (quest) => {
    switch (quest.type) {
      case "Crowdfunding":
        return (
          <>
            <p>
              <strong>Goal:</strong> {quest.crowdfunding.goal}
            </p>
            <p>
              <strong>Current Amount:</strong>{" "}
              {quest.crowdfunding.currentAmount}
            </p>
            <progress
              value={quest.crowdfunding.currentAmount}
              max={quest.crowdfunding.goal}
            ></progress>
          </>
        );
      case "Hackathon":
        return (
          <>
            <p>
              <strong>Total Participants Needed:</strong>{" "}
              {quest.hackathon.totalParticipants}
            </p>
            <p>
              <strong>Current Participants:</strong>{" "}
              {quest.hackathon.currentParticipants}
            </p>
          </>
        );
      case "Study Group":
        return (
          <>
            <p>
              <strong>Subject:</strong> {quest.studyGroup.subject}
            </p>
            <p>
              <strong>Number of Students Required:</strong>{" "}
              {quest.studyGroup.numberOfStudents}
            </p>
          </>
        );
      default:
        return null;
    }
  };

  const handleActionClick = (questId) => {
    // Emit an event to the server to handle the action
    socket.emit("questAction", questId);
  };

  return (
    <div className="quest-slider">
      <h2 className="text-xl mb-4">Available Quests</h2>
      {quests.length === 0 ? (
        <p>No quests available at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {quests.map((quest) => (
            <li key={quest.questId} className="bg-gray-800 p-4 rounded mb-4">
              <h3 className="text-lg mb-2">{quest.name}</h3>
              <p className="mb-2 text-sm">
                <strong>Description:</strong> {quest.description}
              </p>
              {renderQuestDetails(quest)}
              <p className="text-green-400 text-sm">
                <strong>Reward:</strong> {quest.reward.type} -{" "}
                {quest.reward.details}
              </p>
              <p className="text-xs text-gray-400">
                Deadline: {new Date(quest.date.deadline).toLocaleDateString()}
              </p>

              {/* Show progress bar if the quest has a progress attribute */}
              {quest.progress !== undefined && (
                <>
                  <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${quest.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-xs">
                    {quest.progress}% Complete
                  </p>
                </>
              )}

              {/* Action button */}
              {quest.actionRequired && (
                <button
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleActionClick(quest.questId)}
                >
                  {quest.actionRequired}
                </button>
              )}
              {quest.status === "open" && quest.creator.userId != Me && (
                <button
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAcceptQuest(quest.questId)}
                >
                  Accept Quest
                </button>
              )}
              {quest.creator.userId === Me.id && quest.pendingApprovals && quest.pendingApprovals.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-bold">Pending Approvals:</h4>
                  {quest.pendingApprovals.map((approval) => (
                    <div key={approval.userId} className="flex items-center mt-1">
                      <span>{approval.username}</span>
                      <button
                        className="ml-2 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
                        onClick={() => handleApproveParticipant(quest.questId, approval.userId)}
                      >
                        Approve
                      </button>
                      <button
                        className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                        onClick={() => handleRejectParticipant(quest.questId, approval.userId)}
                      >
                        Reject
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestSlider;