import React from 'react';

const NFTPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        {/* Image Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img
              className="rounded-lg object-cover w-full"
              src="https://i.seadn.io/gae/xksD2C1JS7WE2zFnWtYrP-zqEcrEJ5PejADvSYsVbZwxb0AcxZlmAouBEXk8OCDXL4IbABBI_ak6DQ8CSDVJlXG1BBrq6dF9LeC6Fg?auto=format&w=1000"
              alt="NFT"
            />
          </div>
          {/* Details Section */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800">MAYC #1607</h1>
            <p className="text-gray-500 mt-2">Owned by <span className="text-blue-600">ToxSam</span></p>
            <p className="text-gray-800 mt-4 text-xl font-semibold">Price</p>
            <div className="flex items-center space-x-2 mt-1">
              <img
                className="w-6 h-6"
                src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                alt="Ethereum"
              />
              <span className="text-2xl font-semibold text-gray-800">12.85 ETH</span>
            </div>

            <p className="text-gray-600 mt-4">
              MAYC #1607 is part of the Mutant Ape Yacht Club, a popular collection of NFTs. This item
              features a unique combination of traits and rarity, making it highly sought after in the NFT
              marketplace.
            </p>

            {/* Action Buttons */}
            <div className="mt-6">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Buy Now</button>
              <button className="ml-4 px-6 py-3 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100">Make Offer</button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Attributes</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 border rounded-lg text-center">
              <p className="text-gray-500">Background</p>
              <p className="text-lg font-semibold">Blue</p>
            </div>
            <div className="p-4 bg-gray-50 border rounded-lg text-center">
              <p className="text-gray-500">Eyes</p>
              <p className="text-lg font-semibold">Laser Eyes</p>
            </div>
            <div className="p-4 bg-gray-50 border rounded-lg text-center">
              <p className="text-gray-500">Mouth</p>
              <p className="text-lg font-semibold">Grin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
