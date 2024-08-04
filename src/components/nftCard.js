import React from "react";
import NFTimage from './cropped_image_512x512.png';

const NftCard = () => {
    return (
        <div className="max-w-sm rounded shadow-lg m-4 transition-transform hover:scale-105">
            <div className="flex justify-center items-center h-232">
                <img className="w-232 object-cover" src={NFTimage} alt="NFT Image" />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">connective autonomy</div>
                <p className="text-gray-700 text-base">
                    0,39 ETH
                </p>
            </div>
        </div>
    );
}

export default NftCard;
