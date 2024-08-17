import React from 'react';
import { useUser } from '../context/UserContext'; // Assumindo que UserContext está no mesmo diretório

const UserBanner = () => {
  const { userImage, username, userBanner, userDescription } = useUser();

  return (
    <div className="relative w-full h-60 bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg shadow-lg overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${userBanner})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute bottom-0 left-0 ml-4 mb-4 flex items-center">
        <img
          src={userImage}
          alt="User Profile"
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
        />
        <div className="ml-4 text-white">
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-sm font-light">{userDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;

