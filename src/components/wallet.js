import React, { useState, useEffect } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { createUser } from "../backend/createUser";
import imageuser from "../components/guest.jpg";
import { useUser } from '../context/UserContext';

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { userData, setUserData } = useUser(); // Acessa e manipula os dados do usuário a partir do contexto
  const [user, setUser] = useState({ username: '', userImage: '' });

  useEffect(() => {
    const fetchUser = async () => {
      if (isConnected && address) {
        if (!userData || !userData.username) {
          // Se o usuário não existir no contexto, cria um novo usuário
          const newUser = await createUser(address, {
            username: 'Default Username',
            image: imageuser,
            banner: '',
            description: 'Role or short bio',
            createdAt: new Date().toISOString(),
          });

          // Atualiza o contexto com os dados do novo usuário
          setUserData(newUser);

          // Atualiza o estado local
          setUser({
            username: newUser.username,
            userImage: newUser.image,
          });
        } else {
          // Se o usuário já existir no contexto, utiliza esses dados
          setUser({
            username: userData.username,
            userImage: userData.userImage || imageuser, // Usar uma imagem padrão se estiver ausente
          });
        }
      }
    };

    fetchUser();
  }, [isConnected, address, userData, setUserData]);

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
              src={user.userImage || imageuser} // Fallback para uma imagem padrão
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

