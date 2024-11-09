import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Col, Layout, Row } from "antd";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import {
  AptosWalletAdapterProvider,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";

// import { PetraWallet } from "petra-plugin-wallet-adapter";
// import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { Aptos, AptosConfig, get, Network } from "@aptos-labs/ts-sdk";
import { AddressAtom } from "../Utils/AddressAtom";
import { Findme } from "../Utils/Findme";

import { accumulativeContext } from "@react-three/drei";
import { useAtom } from "jotai";
import { charactersAtom, socket } from "../Socketmanager";
import { mintfunc, Transfer } from "../Component/AptosFunctions";
import { CoinsAtom } from "../Utils/CoinsAtom";
import { TranscCount } from "../Utils/TransCount";

const ConnectAptos = () => {
  const [showTransferMenu, setShowTransferMenu] = useState(false);

  const [selectedPerson, setSelectedPerson] = useState(null);

  const [transferAmount, setTransferAmount] = useState("");
  const [me, setme] = useAtom(Findme);
  const wallets = [new PetraWallet()];
  const [addreses, setAddress] = useAtom(AddressAtom);
  const { account } = useWallet();
  const { signAndSubmitTransaction } = useWallet();
  const [coins, setcoins] = useAtom(CoinsAtom);
  const [characters, setchar] = useAtom(charactersAtom);
 const [trans,settrans] = useAtom(TranscCount)
  // Mock data for people (replace with actual data from your application)

  const getBalancePerson = async () => {
    if (!account || !account.address) {
      console.error("Account is not defined or missing address.");
      return null;
    }

    try {
      // Fetch the resource
      const accountResource = await aptos.getAccountResource({
        accountAddress: account?.address,
        resourceType: `${moduleAddress}::BasicCoins::Balance`,
      });
      console.log("Account Resource Response:", accountResource); // Log the full response

      // Check if accountResource or its data is undefined
      if (!accountResource) {
        console.error(
          "Resource is undefined. The account may not have the Counter resource."
        );
        return null;
      }
      setcoins(accountResource.coins.val);
      if (!accountResource.value) {
        console.error("Data field in the resource is undefined.");
        return null;
      }
      setcoins(accountResource.value);
    } catch (error) {
      console.error("Error fetching counter value:", error);
      return null;
    }
  };

  const burn1 = async () => {
    if (!account) return;
    const transaction = {
      data: {
        function: `${moduleAddress}::BasicCoins::burn`,
        functionArguments: ["1"],
      },
    };

    try {
      const response = await signAndSubmitTransaction(transaction);

      await aptos.waitForTransaction({ transactionHash: response.hash });

      console.log("Minting successful");
    } catch (error) {
      console.error("Minting failed:", error);
    }
  };
  const HandleTransfer = async () => {
    Transfer(
      account,
      signAndSubmitTransaction,
      "0x2a2f75fadf5ab3bbbe9baffc87f0f6be11aece54350ac85abb68ade94404dc89",
      1
    );
  };
  const Transfer2 = async () => {
    if (!account || !account.address) {
      console.error("Account is not defined or missing address.");
      return null;
    }
    if (!account) return [];
    const transaction = {
      data: {
        function: `${moduleAddress}::BasicCoins::transfer`,
        functionArguments: [
          "0x2a2f75fadf5ab3bbbe9baffc87f0f6be11aece54350ac85abb68ade94404dc89",
          1,
        ],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });
      setAccountHasList(true);
    } catch (error) {
      setAccountHasList(false);
    } finally {
    }
  };
  const mint1 = async () => {
    if (!account) return;

    const transaction = {
      data: {
        function: `${moduleAddress}::BasicCoins::mint`,

        functionArguments: ["1"],
      },
    };

    try {
      const response = await signAndSubmitTransaction(transaction);

      await aptos.waitForTransaction({ transactionHash: response.hash });

      console.log("Minting successful");
    } catch (error) {
      console.error("Minting failed:", error);
    }
  };
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const moduleAddress =
    "0x192a07e0b7fe341017541039d15a86be023a955e9aa1c6db478e767209c576af";
  const aptos = new Aptos(aptosConfig);
  useEffect(() => {
    if (account && account.address) {
      socket.emit("setAccountAddress", account.address);
    
    }
  }, [trans]);
  useEffect(() => {
    if (account) {
      getBalancePerson();
    }
  }, [account]);
  const handleMint = async () => {
    if (account) {
      const isMintSuccessful = await mintfunc(account, signAndSubmitTransaction, 1);

      if (isMintSuccessful) {
        toast.success("Minting successful!");
        // settrans(trans+1);
        // await getBalancePerson(); // Call only when mint is successful
      } else {
        toast.error("Minting failed. Please try again.");
      }
    } else {
      toast.error("Account is not available.");
    }
  };
  const handleTransferClick = () => {
    setShowTransferMenu(true);
  };

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  const handleTransferSubmit = async () => {
    if (selectedPerson && transferAmount) {
      await Transfer(
        account,
        signAndSubmitTransaction,
        selectedPerson.accountAddress,
        parseInt(transferAmount)
      );

      setShowTransferMenu(false);

      setSelectedPerson(null);

      setTransferAmount("");

      await getBalancePerson();
    }
  };

  return (
    <div className="w-full scale-50 flex-col items-center justify-center bg-green-100/40 absolute z-50">
      <WalletSelector />

      <div className="text-xs">{account != null && account.address}</div>

      {me && me?.role && me.role == "teacher" && (
        <button
          onClick={handleMint}
          className="bg-blue-500 absolute right-6 -top-2 hover:bg-blue-700 text-lg border-none text-white font-bold py-2 px-4 rounded mt-2"
        >
          Mint
        </button>
      )}

      <button
        onClick={getBalancePerson}
        className=" absolute  -right-[10rem] -top-6  text-lg border-none text-black font-bold py-2 px-4  rounded mt-2"
      > coins  {coins} 🪙
        
      </button>

      <button
        onClick={handleTransferClick}
        className="bg-blue-500 absolute right-14 top-10 hover:bg-blue-700 text-lg border-none text-white font-bold py-2 px-4 rounded mt-2"
      >
        Transfer
      </button>

      {/* <div className="absolute text-lg -right-[5rem] -top-1 text-[15px]">
        {coins} 🪙
      </div> */}

      {showTransferMenu && (
        <div className="fixed inset-0 top-[15rem] left-[5rem] z-[99] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Transfer Coins
            </h2>

            <ul className="divide-y divide-gray-200 bg-white/60 shadow rounded-lg mb-4">
              {characters.map((character) => (
                <>
                  {character.accountAddress != "" && (
                    <li
                      key={character.id}
                      className={`py-3 px-4 cursor-pointer hover:bg-gray-100 rounded-lg ${selectedPerson?.id === character.id
                          ? "bg-indigo-100"
                          : ""
                        }`}
                      onClick={() => handlePersonClick(character)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">
                          {character.id}
                        </span>

                        <span className="text-sm text-gray-500">
                          {/* {character.accountAddress} */}
                        </span>
                      </div>
                    </li>
                  )}
                </>
              ))}
            </ul>

            {selectedPerson && (
              <div className="mt-4">
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Enter amount to transfer"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  onClick={handleTransferSubmit}
                  className="mt-2 w-full bg-indigo-500 text-white py-2 px-4 rounded-md text-lg border-none hover:bg-indigo-600"
                >
                  Send
                </button>
              </div>
            )}

            <button
              onClick={() => setShowTransferMenu(false)}
              className="mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-lg border-none hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectAptos;