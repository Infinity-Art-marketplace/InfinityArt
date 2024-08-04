import React, { useState } from 'react';
import Header from '../libs/header';
import '../App.css';
import NftCard from '../components/nftCard';

function Home() {
  const [isFirstSet, setIsFirstSet] = useState(true);

  const firstSetOfNftCards = Array.from({ length: 4 }, (_, index) => <NftCard key={`first-${index}`} />);
  const secondSetOfNftCards = Array.from({ length: 4 }, (_, index) => <NftCard key={`second-${index}`} />);

  const showFirstSet = () => {
    setIsFirstSet(true);
  };

  const showSecondSet = () => {
    setIsFirstSet(false);
  };

  return (
    <div className='flex flex-col h-screen bg-gradient-to-b from-white to-gray-300'>
      <Header />
      <section className='flex flex-col'>
        <div className='flex justify-center items-center text-4xl'>
          <a>collection name</a>
        </div>
        <div className='flex flex-wrap justify-center m-4'>
          <button
            onClick={showFirstSet}
            className='m-4 p-2 text-4xl text-black rounded transition-transform duration-200 ease-in-out hover:text-gray-500 hover:scale-105'
          >
            &lt;
          </button>
          {isFirstSet ? firstSetOfNftCards : secondSetOfNftCards}
          <button
            onClick={showSecondSet}
            className='m-4 p-2 text-4xl text-black rounded transition-transform duration-200 ease-in-out hover:text-gray-500 hover:scale-105'
          >
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
