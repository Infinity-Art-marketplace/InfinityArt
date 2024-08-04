import React, { useState } from 'react';
import Header from '../libs/header';
import '../App.css';
import NftCard from '../components/nftCard';

function Home() {
  const [isFirstSet, setIsFirstSet] = useState(true);

  const firstSetOfNftCards = Array.from({ length: 4 }, (_, index) => <NftCard key={`first-${index}`} />);
  const secondSetOfNftCards = Array.from({ length: 4 }, (_, index) => <NftCard key={`second-${index}`} />);

  const toggleNftCards = () => {
    setIsFirstSet(!isFirstSet);
  };

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex flex-wrap justify-center m-4'>
        {isFirstSet ? firstSetOfNftCards : secondSetOfNftCards}
      </div>
      <button onClick={toggleNftCards} className='m-4 p-2 bg-blue-500 text-white rounded'>
        Toggle NFT Cards
      </button>
    </div>
  );
}

export default Home;
