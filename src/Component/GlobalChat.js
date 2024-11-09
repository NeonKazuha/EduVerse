import React, { useState, useEffect } from 'react';
import { socket } from '../Socketmanager';

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.on('chat history', (msgs) => {
      setMessages(msgs);
    });

    return () => {
      socket.off('chat history');
    };
  }, []);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      socket.emit('chat message', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="absolute z-50 scale-[0.6] bottom-[9rem] -right-20 w-80 max-h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
      <div className="flex-grow p-3 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                        <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit} className="flex p-3 bg-gray-50">
        <textarea
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded resize-none"
        />
        <button type="submit" className="ml-2 text-lg px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default GlobalChat;