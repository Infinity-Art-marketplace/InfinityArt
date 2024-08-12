import React from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { post } from 'aws-amplify/api';

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const [error, setError] = React.useState(null);

  async function createItem() {
    try {
      const newItem = { name: 'New item', message: 'New message!' };
      const response = await post('api0c0b9520', '/items', {
        body: newItem
      });
      console.log('POST call succeeded: ', response);
    } catch (e) {
      console.log('POST call failed: ', JSON.parse(e.response.body));
    }
  }

  return (
    <div className="space-x-4">
      {isConnected ? (
        <>
          <p>{address ? address.slice(0, 7) + '...' : 'Loading...'}</p>
          <button
            onClick={() => open({ view: 'Networks' })}
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            Switch Chain
          </button>
          <button
            onClick={createItem}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            Create Item
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
