import React, { useEffect } from "react";
import { useAtom, atom } from "jotai";

const io = require("socket.io-client");
export const socket = io("http://localhost:3001", {
  withCredentials: true,
});
export const charactersAtom = atom([]);
export const SocketManager = () => {
  const [_characters, setCharacters] = useAtom(charactersAtom);
  useEffect(() => {
    function onConnect() {
      ////console.log("Connected");
    }
    function onDisconnect() {
      ////console.log("Disconnected");
    }
    function Spawner(data) {
      ////console.log("Spawned");
      setCharacters(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("spawn", Spawner);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("spawn", Spawner);
    };
  }, []);
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiNTg0Y2ZiMi02NDA0LTRiYWYtYmY5NC04OTdlZGVhNWVkOGUiLCJlbWFpbCI6ImhzMzgzMTc2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkY2I0NzhjNGJiY2FmN2JjNTcyNyIsInNjb3BlZEtleVNlY3JldCI6ImY2MTFhMTI0MmE1NjU1M2JkZjQ0NDRiMDg3NjIxYjI0MjY1N2ZjM2IyMzY2ODJhZjY4NmIzMjFhNDgyZjRlYWYiLCJpYXQiOjE3MTIzMTk5NTR9.khj5aUA2_LnHoBJLJX5k0jA25SSn2UPTACFtQ3KYFug
//
//pinata IPFS
