import React, { useState } from 'react';
import GlobalChat from './GlobalChat';

const GlobalChatButton = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Button to Toggle Global Chat */}
      <button
        onClick={toggleChatVisibility}
        className="absolute z-50 w-max bottom-[19.9rem] right-[33.5rem] scale-50 middle   none center border-none rounded-lg bg-indigo-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] disabled:opacity-50 disabled:shadow-none"
      >
        {isChatVisible ? 'Hide Global Chat' : 'Show Global Chat'}
      </button>

      {/* Conditionally render GlobalChat */}
      {isChatVisible && <GlobalChat />}
    </div>
  );
};

export default GlobalChatButton;
