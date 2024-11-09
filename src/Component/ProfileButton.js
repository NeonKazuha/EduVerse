// src/Component/ProfileButton.js
import React from 'react';

const ProfileButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute z-10 left-10  middle scale-50  none center border-none rounded-lg bg-indigo-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] disabled:opacity-50 disabled:shadow-none"
    >
      Profile
    </button>
  );
};

export default ProfileButton;