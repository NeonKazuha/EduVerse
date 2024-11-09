import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { TheaterContract } from '../Utils/Component';

export const useBuyItem = () => {
    const [provider, setProvider] = useState(null);
    const [ticketId, setTicketId] = useState(null);

    useEffect(() => {
        async function init() {
            if (window.ethereum) {
                const TheaterAddress = '0x64bd384eA6d6B76ee7C3E1248beaA9cE3157f9dD';
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(TheaterAddress, TheaterContract.abi, signer);

                const tickets = await contract.getOwnedTickets();
                setProvider(provider);
                setTicketId(tickets[0]);
            } else {
                alert('Please install MetaMask extension to use this application.');
            }
        }

        init();
    }, []);

    const buyItem = async () => {
        if (!ticketId || !provider) {
            console.error("Ticket ID or provider is missing.");
            return false;
        }
        try {
            const TheaterAddress = '0x64bd384eA6d6B76ee7C3E1248beaA9cE3157f9dD';
            const signer = provider.getSigner();
            const contract = new ethers.Contract(TheaterAddress, TheaterContract.abi, signer);

            const tx = await contract.checkTicket(ticketId, { gasLimit: 5000000 });
            await tx.wait();
            ////console.log("Item purchased successfully.");
            return true;
        } catch (error) {
            console.error("Error purchasing item:", error);
            return false;
        }
    };

    return { buyItem };
};
