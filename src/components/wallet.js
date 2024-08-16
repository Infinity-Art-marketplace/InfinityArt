import React, { useEffect, useState } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { updateUser } from "../backend/api";
import userImage from "./guest.jpg"; // Imagem padrão

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const [userImageSrc, setUserImageSrc] = useState(userImage); // Estado para a imagem do usuário
  const [username, setUsername] = useState(''); // Estado para o nome de usuário

  useEffect(() => {
    if (isConnected && address) {
      console.log('Updating user with address:', address); // Log para confirmar o address antes da chamada API
      updateUser(address, { username: null, image: null })
        .then((user) => {
          console.log('User created/updated successfully with address:', address);
          // Se a imagem do usuário for nula, usa a imagem padrão
          setUserImageSrc(user.image || userImage);
          // Se o nome de usuário for nulo, usa um valor padrão
          setUsername(user.username || 'Default Username');
        })
        .catch(error => {
          console.error('Error creating/updating user:', error);
        });
    }
  }, [isConnected, address]); // Garante que a chamada é feita sempre que address ou isConnected mudam

  // Função para truncar o nome de usuário
  const truncateUsername = (name) => {
    if (name.length > 17) {
      return name.slice(0, 17) + '...';
    }
    return name;
  };

  return (
    <div className="flex items-center justify-between min-w-[252px] max-w-[388px]"> {/* Define largura mínima e máxima */}
      {isConnected ? (
        <>
          <div className="flex items-center space-x-4 flex-grow">
            <img
              src={userImageSrc} // Usa a imagem do usuário ou a imagem padrão
              alt="User Image"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-lg font-bold mr-4">{truncateUsername(username)}</p> {/* Usa o nome de usuário truncado e adiciona margem à direita */}
              <p className="text-xs text-gray-500">
                {address ? `${address.slice(0, 7)}...` : 'Loading...'}
              </p>
            </div>
          </div>
          <button
            onClick={() => open({ view: 'Networks' })}
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105" // Remove a largura máxima para deixar o botão ajustar conforme o conteúdo
          >
            Switch Chain
          </button>
        </>
      ) : (
        <button
          onClick={() => open()}
          className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105" // Remove a largura máxima para deixar o botão ajustar conforme o conteúdo
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectButton;

