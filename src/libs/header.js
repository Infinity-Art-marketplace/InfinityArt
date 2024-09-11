import React, { useState } from "react";
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useUser } from '../context/UserContext';  // Importa o contexto
import ConnectButton from "../components/wallet";
import SearchBar from "../components/SearchBar";

import { AiFillHome } from "react-icons/ai";
import { FaUser, FaSearch } from "react-icons/fa";
import { GiCube } from "react-icons/gi"; 

const Header = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const [showSearchBar, setShowSearchBar] = useState(false); // Estado para controlar a visibilidade da SearchBar
  const { setAddress } = useUser();  // Usa o contexto para definir o address

  const handleProfileClick = (e) => {
    if (!isConnected) {
      e.preventDefault();  // Previne a navegação se não estiver conectado
      alert("Você ainda não está conectado.");
    } else {
      setAddress(address);  // Atualiza o contexto com o address ao clicar no link
    }
  };

  return (
    <header className="m-2 p-4 box-border"> {/* Removido fundo e sombra */}
      <div className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li className="relative group">
            <a href="/" className="flex items-center justify-center w-10 h-10 bg-purple-200/50 rounded-full">
              <AiFillHome className="text-black text-2xl" />
            </a>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="bg-white text-black text-sm p-2 rounded-lg shadow-lg mt-2 whitespace-nowrap">
                Home
              </div>
            </div>
          </li>
          <li className="relative group">
            <a 
              href={isConnected ? `/user-profile/${address}` : "#"}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${isConnected ? 'bg-purple-200/50' : 'bg-red-500 cursor-not-allowed'}`}
              onClick={handleProfileClick}  // Define o comportamento de clique
            >
              <FaUser className="text-black text-2xl" />
            </a>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="bg-white text-black text-sm p-2 rounded-lg shadow-lg mt-2 whitespace-nowrap">
                {isConnected ? 'User Profile' : 'Conecte-se primeiro'}
              </div>
            </div>
          </li>
          <li className="relative group">
            <a 
              href="/create-nfts"
              className="flex items-center justify-center w-10 h-10 bg-purple-200/50 rounded-full"
            >
              <GiCube className="text-black text-2xl" />
            </a>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="bg-white text-black text-sm p-2 rounded-lg shadow-lg mt-2 whitespace-nowrap">
                Create NFT
              </div>
            </div>
          </li>

          {/* Botão para exibir/esconder a SearchBar */}
          <li className="relative group">
            <button
              className="flex items-center justify-center w-10 h-10 bg-purple-200/50 rounded-full hover:bg-purple-300 transition duration-300"
              onClick={() => setShowSearchBar(!showSearchBar)} // Alterna a visibilidade da SearchBar
            >
              <FaSearch className="text-black text-2xl" />
            </button>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="bg-white text-black text-sm p-2 rounded-lg shadow-lg mt-2 whitespace-nowrap">
                Search
              </div>
            </div>
          </li>
        </ul>

        {/* Layout Estático para a SearchBar */}
        <div
          className={`transition-all duration-500 ease-in-out ml-4 ${
            showSearchBar ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
          } overflow-hidden`}
          style={{ width: showSearchBar ? "300px" : "0" }} // Definir largura estática
        >
          <SearchBar />
        </div>

        <ConnectButton />
      </div>
    </header>
  );
}

export default Header;
