import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { getUser } from "../backend/getUser";
import imageuser from "../components/cropped_image_512x512.png";
import imageguest from "../components/guest.jpg";

const UserContext = createContext({
  userData: {
    username: 'Default Username',
    userImage: imageguest,
    userBanner: imageuser,
    userDescription: 'Role or short bio',
    createdAt: new Date().toISOString(),
  }
});

export const UserProvider = ({ children }) => {
  const { address, isConnected } = useWeb3ModalAccount();
  
  const [userData, setUserData] = useState({
    username: 'Default Username',
    userImage: imageguest,
    userBanner: imageuser,
    userDescription: 'Role or short bio',
    createdAt: new Date().toISOString(),
  });

  const fetchUserData = async () => {
    if (!address) return;

    try {
      const user = await getUser(address);
      if (user) {
        setUserData({
          username: user.username?.trim() || 'Default Username',
          userImage: user.image || imageguest,
          userBanner: user.banner || imageuser,
          userDescription: user.description?.trim() || 'Role or short bio',
          createdAt: user.createdAt || new Date().toISOString(),
        });
      } else {
        console.log('No user found. Returning default user.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchUserData();
    }
  }, [isConnected, address]);

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

