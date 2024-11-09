import React from "react";
import { charactersAtom, socket } from "../Socketmanager";
import { useAtom } from "jotai";

const AttendanceTaker = () => {
  const [characters] = useAtom(charactersAtom);
  console.log(characters)
  const handleTakeAttendance = () => {
    //console.log("Taking attendance");

    socket.emit("takeAttendance");
  };

  return (
    <div className="bg-transparent shadow p-4 py-8">
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800 ">
        Take Attendance
      </div>
      <div className="flex justify-center">
        <div
          onClick={handleTakeAttendance}
          className="btn border border-green-500 p-2 px-6 font-semibold cursor-pointer text-white bg-green-500"
        >
          Take Attendance
        </div>
      </div>
      <div className="mt-4">
        <ul className="divide-y divide-gray-200 bg-white/60 shadow rounded-lg">
          {characters.map((character) => (
            <>
              { (
                <li
                  key={character.id}
                  className="py-3 px-4 flex justify-between items-center"
                >
                  <span className="font-xs text-gray-700">{character.id}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${character.present
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {character.present ? "Present" : "Absent"}
                  </span>
                </li>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendanceTaker;