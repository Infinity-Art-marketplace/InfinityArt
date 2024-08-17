import React from 'react';

const Banner = ({ title, subtitle, price, image, buttonLabel, background }) => {
  return (
    <div className={`relative w-full h-72 ${background} rounded-lg shadow-lg overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-sm font-light">{subtitle}</p>
        <p className="text-xs font-light">{price}</p>
        <button className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full shadow-md">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Banner;

