import React, { useState, useEffect } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { generateClient } from 'aws-amplify/api';
import { createUser } from '../graphql/mutations';

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const [account, setAccount] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const client = generateClient();

  useEffect(() => {
    const submitUser = async () => {
      try {
        console.log("Submitting user with account:", account);
        const result = await client.graphql({
          query: createUser,
          variables: { account, username: null, image: null }
        });
        console.log("User creation result:", result);
        setUser(result.data.createUser);
      } catch (error) {
        console.error("Error submitting user:", error);
        setError(error);
      }
    };

    if (isConnected && address) {
      console.log("Address is set to:", address);
      setAccount(address);
      submitUser();
    } else {
      console.log("Address is not available or user is not connected.");
    }
  }, [isConnected, address, account, client]);

  return (
    <div className="space-x-4">
      {isConnected ? (
        <>
          <p>{address.slice(0, 7) + "..."}</p>
          <button
            onClick={() => open({ view: 'Networks' })}
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            Switch Chain
          </button>
        </>
      ) : (
        <button
          onClick={() => open()}
          className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
        >
          Connect Wallet
        </button>
      )}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default ConnectButton;
