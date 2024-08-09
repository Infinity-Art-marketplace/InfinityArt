import React, { useState, useEffect } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { generateClient } from 'aws-amplify/api';
import { createUser } from '../graphql/mutations';

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const [account, setAccount] = useState('');
  const [error, setError] = useState(null);

  const client = generateClient();

  useEffect(() => {
    if (isConnected && address) {
      setAccount(address);
      submitUser();
    }
  }, [isConnected, address]);

  async function submitUser() {
    try {
      await client.graphql({
        query: createUser,
        variables: { input: { account, username: null, image: null } },
      });
    } catch (error) {
      console.error('Error submitting user:', error);
      setError(error);
    }
  }

  return (
    <div className="space-x-4">
      {isConnected ? (
        <>
          <p>{address.slice(0, 7) + '...'}</p>
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
