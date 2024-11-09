import React, { useEffect, useState } from 'react';
import { socket } from '../Socketmanager';
import toast, { Toaster } from 'react-hot-toast';

const QuestNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for questCreated event
    socket.on('questCreated', (data) => {
      setNotifications((prev) => [...prev, data]);
      toast.success(data.message, {
        position: 'top-right',
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    });

    // Cleanup on component unmount
    return () => {
      socket.off('questCreated');
    };
  }, []);

  return (
    <div className="absolute z-50 top-0 scale-50 right-0 m-4">
      <Toaster />
    </div>
  );
};

export default QuestNotification;