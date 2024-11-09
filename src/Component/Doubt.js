import React from "react";
import { socket } from "../Socketmanager";

const Doubt = () => {
  const RaiseDoubt = () => {
    ////console.log(socket.id, "Raise a doubt");
    socket.emit("Doubt", true);
  };

  return (
    <button
      onClick={RaiseDoubt}
      className="mx-1 px-2 py-1 absolute left-2 bottom-36 bg-indigo-500 text-white rounded-sm text-[16px] shadow-sm mb-1 border-none"
      data-ripple-light="true"
    >
      Raise Doubt
    </button>
  );
};

export default Doubt;
