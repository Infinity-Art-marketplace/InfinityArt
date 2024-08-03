import React from "react";
import NFTimage from './cropped_image_512x512.png';

const NftCard = () => {
    return (
        <div className="max-w-sm rounded shadow-lg m-4">
            <img className="w-232 h-232 object-cover" src={NFTimage} alt="NFTImage" />
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
