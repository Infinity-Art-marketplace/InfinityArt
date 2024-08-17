import React from "react";
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import ConnectButton from "../components/wallet";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const { address, isConnected } = useWeb3ModalAccount();

  return (
    <header className="m-2 p-2 box-border">
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
          {isConnected && (
            <li className="relative group">
              {/* Usando template literal para formar a URL dinamicamente */}
              <a href={`/user-profile/${address}`} className="flex items-center justify-center w-10 h-10 bg-purple-200/50 rounded-full">
                <FaUser className="text-black text-2xl" />
              </a>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="bg-white text-black text-sm p-2 rounded-lg shadow-lg mt-2 whitespace-nowrap">
                  User Profile
                </div>
              </div>
            </li>
          )}
        </ul>
        <ConnectButton />
      </div>
    </header>
  );
}

export default Header;

