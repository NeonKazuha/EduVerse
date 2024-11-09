// src/Component/SessionList.js
import React, { useState } from "react";
import { useAtom } from "jotai";
import { charactersAtom } from "../Socketmanager";

const SessionList = () => {
  const [characters] = useAtom(charactersAtom);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [mintInfo, setMintInfo] = useState("");

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setMintInfo("");
  };

  const handleMint = () => {
    // Implement minting logic here
    ////console.log(`Minting for ${selectedCharacter.id} with info: ${mintInfo}`);
    setSelectedCharacter(null);
    setMintInfo("");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Session Participants ({characters.length})
      </h2>
      <ul className="divide-y divide-gray-200 bg-white/60 shadow rounded-lg">
        {characters.map((character) => (
          <li
            key={character.id}
            className="py-3 px-4 cursor-pointer hover:bg-gray-100 rounded-lg "
            onClick={() => handleCharacterClick(character)}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-xs text-gray-700">{character.id}</span>
                <span className="font-xs text-gray-500 ml-2">
                  {character.role === 'presenter' ? 'Presenter' : 'Presentee'}
                </span>
              </div>
            </div>
            {selectedCharacter && selectedCharacter.id === character.id && (
              <div className="mt-2">
                <input
                  type="text"
                  value={mintInfo}
                  onChange={(e) => setMintInfo(e.target.value)}
                  placeholder="Enter minting information"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleMint}
                  className="mt-2 w-full  text-white py-2 px-4 rounded-md bg-indigo-500 text-lg border-none"
                >
                  MINT
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;