import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { updateUser } from "../backend/updatewallet";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { address, isConnected } = useWeb3ModalAccount();
  const [userData, setUserData] = useState({
    username: 'Default Username',
    userImage: './guest.jpg',
    userBanner: '../components/cropped_image_512x512.png',
    userDescription: 'Role or short bio'
  });

  useEffect(() => {
    if (isConnected && address) {
      updateUser(address, { username: null, image: null, banner: null, description: null })
        .then((user) => {
          setUserData({
            username: user.username || 'Default Username',
            userImage: user.image || './guest.jpg',
            userBanner: user.banner || '../components/cropped_image_512x512.png',
            userDescription: user.description || 'Role or short bio'
          });
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    }
  }, [isConnected, address]);

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

