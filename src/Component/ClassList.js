// src/Component/ClassList.js
import React, { useState } from "react";
import { useAtom } from "jotai";
import { charactersAtom } from "../Socketmanager";
import { mintfunc, Transfer } from "./AptosFunctions";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import toast from "react-hot-toast";

const ClassList = () => {
  const [characters] = useAtom(charactersAtom);
  const [coinInput, setCoinInput] = useState({});
  const [showInput, setShowInput] = useState({});
  const { account, signAndSubmitTransaction } = useWallet();

  const handleSendCoins = async (character) => {
    const amount = parseInt(coinInput[character.id], 10);
    console.log(coinInput[character.id]);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid coin amount");
      return;
    }
    console.log(character.accountAddress.toString());

    try {
      Transfer(
        account,
        signAndSubmitTransaction,
        character.accountAddress,
        amount
      );
      // Transfer(account,signAndSubmitTransaction,"0x2a2f75fadf5ab3bbbe9baffc87f0f6be11aece54350ac85abb68ade94404dc89",
      //   1)

      toast.success(`Transferred ${amount} coins to ${character.id}`);

      // Reset input field
      setCoinInput({ ...coinInput, [character.id]: "" });
      setShowInput({ ...showInput, [character.id]: false });
    } catch (error) {
      toast.error(`Error transferring coins: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Class Members</h2>
      <ul className="divide-y divide-gray-200 bg-white/60 shadow rounded-lg">
        {characters.map((character) => (
          <>
            {character.role != " " && (
              <li key={character.id} className="py-3 px-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-xs text-gray-700">
                      {character.id}
                    </span>
                    <span className="font-xs text-gray-500 ml-2">
                      {character.role}
                    </span>
                    <button
                      onClick={() =>
                        setShowInput({
                          ...showInput,
                          [character.id]: !showInput[character.id],
                        })
                      }
                      className="mx-1 text-[40px] scale-75 px-2 bg-indigo-500 -mb-10 text-white rounded-md border-none shadow-lg"
                    >
                      Coins
                    </button>
                  </div>
                </div>
                {showInput[character.id] && (
                  <div className="mt-2 flex flex-col items-start">
                    <input
                      type="number"
                      value={coinInput[character.id] || ""}
                      onChange={(e) =>
                        setCoinInput({
                          ...coinInput,
                          [character.id]: e.target.value,
                        })
                      }
                      className="w-20 px-3 py-2 border rounded border-slate-200 mb-2"
                      placeholder="Coins"
                    />
                    <button
                      onClick={() => handleSendCoins(character)} // Pass entire character object here
                      className="mx-1 text-[40px] px-2 my-2 bg-indigo-500 -mb-10 text-white rounded-md border-none shadow-lg"
                    >
                      Send
                    </button>
                  </div>
                )}
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;