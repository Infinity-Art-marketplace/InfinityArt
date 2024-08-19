import React, { useState, useEffect } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { createUser } from "../backend/createUser";
import imageuser from "../components/guest.jpg";

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const [user, setUser] = useState({ username: '', userImage: '' });

  useEffect(() => {
    const fetchUser = async () => {
      if (isConnected && address) {
        // Chama a função real createUser passando os dados
        const userData = await createUser(address, {
          username: 'Default Username',
          image: imageuser,
          banner: '',
          description: 'Role or short bio',
          createdAt: new Date().toISOString(),
        });

        // Atualiza o estado local com os dados retornados
        setUser({
          username: userData.username,
          userImage: userData.image,
        });
      }
    };

    fetchUser();
  }, [isConnected, address]);

  const truncateUsername = (name) => {
    if (!name || name.trim() === '') {
      name = 'Default Username';
    }
    if (name.length > 17) {
      return name.slice(0, 17) + '...';
    }
    return name;
  };

  return (
    <div className="flex items-center justify-between min-w-[252px] max-w-[388px]">
      {isConnected ? (
        <>
          <div className="flex items-center space-x-4 flex-grow">
            <img
              src={user.userImage}
              alt="User Image"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-lg font-bold mr-4">{truncateUsername(user.username)}</p>
              <p className="text-xs text-gray-500">
                {address ? `${address.slice(0, 7)}...` : 'Loading...'}
              </p>
            </div>
          </div>
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
