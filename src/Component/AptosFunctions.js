import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { TranscCount } from "../Utils/TransCount";
import { useAtom } from "jotai";

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const moduleAddress = "0x192a07e0b7fe341017541039d15a86be023a955e9aa1c6db478e767209c576af";
const aptos = new Aptos(aptosConfig);

export const mintfunc = async (account, signAndSubmitTransaction, amount) => {

  if (!account) return false;

  const transaction = {
    data: {
      function: `${moduleAddress}::BasicCoins::mint`,
      functionArguments: [amount.toString()],
    },
  };

  try {
    const response = await signAndSubmitTransaction(transaction);
    await aptos.waitForTransaction({ transactionHash: response.hash });
    console.log("Minting successful");
    return true; // Return true if minting is successful
  } catch (error) {
    console.error("Minting failed:", error);
    return false; // Return false if minting fails
  }
};
export const getBalancePerson = async (account) => {
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


export const burn1 = async (account, signAndSubmitTransaction, amount) => {
  if (!account) return false;

  const transaction = {
    data: {
      function: `${moduleAddress}::BasicCoins::burn`,
      functionArguments: [amount.toString()],
    },
  };

  try {
    const response = await signAndSubmitTransaction(transaction);
    await aptos.waitForTransaction({ transactionHash: response.hash });
    console.log("Burning successful");
    return true; // Return true if burning is successful
  } catch (error) {
    console.error("Burning failed:", error);
    return false; // Return false if burning fails
  }
};

export const Transfer = async (account, signAndSubmitTransaction, recipientAddress, amount) => {
  if (!account || !account.address) {
    console.error("Account is not defined or missing address.");
    return false;
  }

  const transaction = {
    data: {
      function: `${moduleAddress}::BasicCoins::transfer`,
      functionArguments: [
        recipientAddress,
        amount.toString()
      ],
    },
  };

  try {
    const response = await signAndSubmitTransaction(transaction);
    await aptos.waitForTransaction({ transactionHash: response.hash });
    console.log("Transfer successful");
    return true; // Return true if transfer is successful
  } catch (error) {
    console.error("Transfer failed:", error);
    return false; // Return false if transfer fails
  }
};
