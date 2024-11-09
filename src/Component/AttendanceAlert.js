import React, { useState } from "react";
import { socket } from "../Socketmanager";
import { Findme } from "../Utils/Findme";
import { useAtom } from "jotai";

const AttendanceAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
const [me,setMe] = useAtom(Findme)
  socket.on("attendanceRequest", () => {
    setShowAlert(true);
  });

  const handleResponse = (present) => {
    socket.emit("attendanceResponse", { present });
    setShowAlert(false);
  };

  if (!showAlert) return null;

  return (<>
  { me.role === 'student' &&
  
    <div className="absolute z-40 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p>Are you present?</p>
        <button
          onClick={() => handleResponse(true)}
          className="m-2 p-2 bg-green-500 text-white rounded"
        >
          Yes
        </button>
        <button
          onClick={() => handleResponse(false)}
          className="m-2 p-2 bg-red-500 text-white rounded"
        >
          No
        </button>
      </div>
    </div>}
  </>

  );
};

export default AttendanceAlert;
