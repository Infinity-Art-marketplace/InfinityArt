import React from 'react';
import banner from './cropped_image_512x512.png';

const Banner = () => {
  return (
    <div className="relative w-full h-72 bg-gradient-to-b from-blue-500 to-green-500 rounded-lg shadow-lg overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-3xl font-bold mb-2">One Summer Day</h1>
        <p className="text-sm font-light">By dailofrog</p>
        <p className="text-xs font-light">Open edition 0.001 ETH</p>
        <button className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full shadow-md">
          Minting now
        </button>
      </div>
    </div>
  );
};

export default Banner;
