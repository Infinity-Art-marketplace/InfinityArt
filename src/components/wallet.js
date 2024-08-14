import React, { useEffect } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { updateUser } from "../backend/api";

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (isConnected && address) {
      // Atualiza o usuário na DynamoDB com address como ID, username e image como null
      updateUser(address, { username: null, image: null })
        .then(() => {
          console.log('User created/updated successfully with address:', address);
        })
        .catch(error => {
          console.error('Error creating/updating user:', error);
        });
    }
  }, [isConnected, address]);

  return (
    <div className="space-x-4">
      {isConnected ? (
        <>
          <p>{address ? `${address.slice(0, 7)}...` : 'Loading...'}</p>
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
    </div>
  );
};

export default ConnectButton;
