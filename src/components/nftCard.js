import React from "react";
import NFTimage from './cropped_image_512x512.png';

const NftCard = () => {
  return (
    <div className="max-w-sm rounded shadow-lg m-4 transition-transform hover:scale-105 bg-white">
      <div className="flex justify-center items-center h-232">
        <img className="w-232 object-cover" src={NFTimage} alt="NFT Image" />
      </div>
      <div className="px-6 py-4 text-center">
        {/* Título do NFT */}
        <div className="font-bold text-xl mb-2">Connective Autonomy</div>

        {/* Valor do NFT com imagem do Ethereum */}
        <div className="flex justify-center items-center space-x-2 text-xl font-bold mb-4">
          <img
            className="w-6 h-6"
            src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
            alt="Ethereum"
          />
          <span className="text-gray-700">0.39 ETH</span>
        </div>

        {/* Botão "Bind Now" */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Bind Now
        </button>
      </div>
    </div>
  );
};

export default NftCard;

