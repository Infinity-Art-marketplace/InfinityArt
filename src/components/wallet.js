import React, { useEffect } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { updateUser } from "../backend/api";

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (isConnected && address) {
      console.log('Updating user with address:', address); // Log para confirmar o address antes da chamada API
      updateUser(address, { username: null, image: null })
        .then(() => {
          console.log('User created/updated successfully with address:', address);
        })
        .catch(error => {
          console.error('Error creating/updating user:', error);
        });
    }
  }, [isConnected, address]); // Garante que a chamada é feita sempre que address ou isConnected mudam

  return (
    <div className="flex items-center justify-between w-full space-x-4">
      {isConnected ? (
        <>
          <div className="flex items-center space-x-4">
            <img
              src="/path/to/your/image.png"
              alt="User Image"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-lg font-bold">Username</p>
              <p className="text-xs text-gray-500">
                {address ? `${address.slice(0, 7)}...` : 'Loading...'}
              </p>
            </div>
          </div>
          <button
            onClick={() => open({ view: 'Networks' })}
            className="ml-auto bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            Switch Chain
          </button>
        </>
      ) : (
        <button
          onClick={() => open()}
          className="ml-auto bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectButton;

