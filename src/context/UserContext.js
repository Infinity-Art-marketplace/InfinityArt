import React, { createContext, useContext, useState, useEffect } from 'react';
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
  },
  setUserData: () => {},
  setAddress: () => {}
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    username: 'Default Username',
    userImage: imageguest,
    userBanner: imageuser,
    userDescription: 'Role or short bio',
    createdAt: new Date().toISOString(),
  });
  
  const [address, setAddress] = useState(() => {
    // Recupera o endereço da localStorage se disponível
    return localStorage.getItem('userAddress') || null;
  });

  const fetchUserData = async (address) => {
    if (!address) return;  

    console.log('Fetching user data for address:', address); 
    try {
      const user = await getUser(address);  
      console.log('User data fetched:', user); 
      if (user) {
        setUserData({
          username: user.username?.trim() || 'Default Username',
          userImage: user.image || imageguest,
          userBanner: user.banner || imageuser,
          userDescription: user.description?.trim() || 'Role or short bio',
          createdAt: user.createdAt || new Date().toISOString(),
        });
      } else {
        console.log('No user found for this address.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    console.log('Address in context:', address); 
    if (address) {
      fetchUserData(address);  
    }
  }, [address]);

  // Atualiza o endereço e salva na localStorage
  const handleSetAddress = (newAddress) => {
    setAddress(newAddress);
    localStorage.setItem('userAddress', newAddress);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, setAddress: handleSetAddress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

