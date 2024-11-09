// src/Component/ProfileDialog.js
import React from "react";

const ProfileDialog = ({ character, onClose }) => {
  const nftAchievements = [
    "Course Completion",
    "Subject Specialization",
    "Social Awareness Campaign Participation",
    // Add more achievements as needed
  ];

  return (
    <div className="absolute z-50 h-auto w-[40rem] -top-20 left-20 scale-50 ">
      <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-4 text-indigo-600">{character.id}'s Profile</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Role</h3>
            <p className="text-gray-600">{character.role === 'presenter' ? 'Presenter' : 'Student'}</p>
          </div>
          {character.role !== 'presenter' && (
            <>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Grades</h3>
                <p className="text-gray-600">A+ (placeholder)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">XP</h3>
                <p className="text-gray-600">1000 XP (placeholder)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Coins Earned</h3>
                <p className="text-gray-600">500 coins (placeholder)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">NFT Achievements</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {nftAchievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDialog;