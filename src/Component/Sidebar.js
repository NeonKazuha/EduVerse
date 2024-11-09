import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import QuestSlider from "./QuestSlider";

const Sidebar = (props) => {
  const [move, setMove] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const sideRef = useRef();
  const profileRef = useRef();
  const questsRef = useRef();
  const inventoryRef = useRef();
  const navigate = useNavigate();

  const Onclick = () => {
    if (move) {
      gsap.to(sideRef.current, { x: 276, duration: 0.5, ease: "easein" });
    } else {
      gsap.to(sideRef.current, { x: 0, duration: 0.3 });
    }
    setMove(!move);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    gsap.to(profileRef.current, { x: 0, duration: 0.3 });
  };

  const handleProfileClose = () => {
    gsap.to(profileRef.current, { x: "100%", duration: 0.3 }).then(() => {
      setShowProfile(false);
    });
  };

  const handleQuestsClick = () => {
    setShowQuests(true);
    gsap.to(questsRef.current, { x: 0, duration: 0.3 });
  };

  const handleQuestsClose = () => {
    gsap.to(questsRef.current, { x: "100%", duration: 0.3 }).then(() => {
      setShowQuests(false);
    });
  };

  const handleInventoryClick = () => {
    setShowInventory(true);
    gsap.to(inventoryRef.current, { x: 0, duration: 0.3 });
  };

  const handleInventoryClose = () => {
    gsap.to(inventoryRef.current, { x: "100%", duration: 0.3 }).then(() => {
      setShowInventory(false);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative">
      <div
        ref={sideRef}
        onClick={Onclick}
        className="w-[3vw] text-white absolute z-10"
      >
        <img src="./menu.png" alt="" />

        <div className="w-[9rem] bg-gradient-to-b from-gray-900 to-gray-700/10 h-[100vh] mt-[-1.7rem] ml-[-9rem] z-50 absolute flex flex-col justify-start align-middle py-[5vh] gap-[2px] text-sm">
          <div
            className="w-full rounded-sm text-[16px] hover:bg-gray-700/30 text-gray-200 text-center hover:duration-150 z-10 p-[0.3rem]"
            onClick={handleProfileClick}
          >
            Profile
          </div>

          <div
            className="w-full rounded-sm text-[16px] hover:bg-gray-700/30 text-gray-200 text-center hover:duration-150 z-10 p-[0.3rem]"
            onClick={handleQuestsClick}
          >
            Quests
          </div>

          <div
            className="w-full rounded-sm text-[16px] hover:bg-gray-700/30 text-gray-200 text-center hover:duration-150 z-10 p-[0.3rem]"
            onClick={handleInventoryClick}
          >
            Inventory
          </div>

          <div className="w-full mt-16 border-b-2 border-gray-600/10 z-10"></div>

          <div
            className="w-full rounded-sm text-[16px] mt-3 hover:bg-gray-700/30 p-2 text-gray-200 text-center z-10"
            onClick={handleLogout}
          >
            Log Out
          </div>
        </div>
      </div>

      {/* Profile Side Panel */}
      <div
        ref={profileRef}
        className="fixed top-0 right-0 w-[25vw] h-full bg-gray-900 text-white p-6 z-20 translate-x-[100%] overflow-y-auto"
      >
        <button
          onClick={handleProfileClose}
          className="text-right mb-4 text-lg hover:text-gray-400 transition"
        >
          Close
        </button>
        <h2 className="text-xl mb-4">Character Profile</h2>
        <p className="mb-2 text-sm">Name: John Doe</p>
        <p className="mb-2 text-sm">Role: Explorer</p>
        <p className="mb-2 text-sm">Level: 42</p>
        <p className="mb-2 text-sm">Experience: 85,000 XP</p>
        <p className="mb-2 text-sm">Equipment: VR Suit, Energy Sword</p>
      </div>

      {/* Quests Side Panel */}
      <div
        ref={questsRef}
        className="fixed top-0 right-0 w-[25vw] h-full bg-gray-900 text-white p-6 z-20 translate-x-[100%] overflow-y-auto"
      >
        <button
          onClick={handleQuestsClose}
          className="text-right mb-4 text-lg hover:text-gray-400 transition"
        >
          Close
        </button>
        <QuestSlider />
        <h2 className="text-xl mb-4">Available Quests</h2>
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-lg mb-2">Attend Virtual Event</h3>
            <p className="mb-2 text-sm">
              Join the AI Ethics webinar on July 15th at 2 PM
            </p>
            <p className="text-green-400 text-sm">
              Reward: AI Ethics Pioneer NFT
            </p>
            <p className="text-xs text-gray-400">
              Scheduled for: July 15, 2023 14:00
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-lg mb-2">Complete Python Course</h3>
            <p className="mb-2 text-sm">
              Finish all modules of the Advanced Python Programming course
            </p>
            <p className="text-green-400 text-sm">Reward: Python Master NFT</p>
            <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-right text-xs">75% Complete</p>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-lg mb-2">Help a Friend</h3>
            <p className="mb-2 text-sm">
              Assist a fellow student in solving a coding challenge
            </p>
            <p className="text-green-400 text-sm">Reward: Helpful Coder NFT</p>
            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Complete Quest
            </button>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-lg mb-2">Reach Level 50</h3>
            <p className="mb-2 text-sm">
              Achieve Level 50 to unlock exclusive perks and in-game content
            </p>
            <p className="text-green-400 text-sm">
              Reward: Master Explorer NFT
            </p>
            <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "40%" }}
              ></div>
            </div>
            <p className="text-right text-xs">40% Complete</p>
          </div>

          {/* Reach Level 20 Quest */}
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-lg mb-2">Reach Level 20</h3>
            <p className="mb-2 text-sm">
              Advance to Level 20 to unlock new challenges and rewards
            </p>
            <p className="text-green-400 text-sm">
              Reward: Level 20 Explorer Badge
            </p>
            <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
            <p className="text-right text-xs">85% Complete</p>
          </div>
        </div>
      </div>

      {/* Inventory Side Panel */}
      <div
        ref={inventoryRef}
        className="fixed top-0 right-0 w-[25vw] h-full bg-gray-900 text-white p-6 z-20 translate-x-[100%] overflow-y-auto"
      >
        <button
          onClick={handleInventoryClose}
          className="text-right mb-4 text-lg hover:text-gray-400 transition"
        >
          Close
        </button>
        <h2 className="text-xl mb-4">Inventory</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded">
            <img
              src="/inventory/car.png"
              alt="Black Frock"
              className="w-full h-auto"
            />
            <p className="text-sm mt-2">Car</p>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <img
              src="/inventory/SheenChair.png"
              alt="Black Frock"
              className="w-full h-auto"
            />
            <p className="text-sm mt-2">Sheen Chair</p>
          </div>
          {/* <div className="bg-gray-800 p-4 rounded">
            <img
              src="/inventory/GreenShirt.png"
              alt="Green Shirt"
              className="w-full h-auto"
            />
            <p className="text-sm mt-2">Green Shirt</p>
          </div> */}
          {/* <div className="bg-gray-800 p-4 rounded">
            <img
              src="/inventory/WhiteTshirt.png"
              alt="White T-Shirt"
              className="w-full h-auto"
            />
            <p className="text-sm mt-2">White T-Shirt</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;