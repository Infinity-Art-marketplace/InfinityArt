import React from 'react';
import Header from '../libs/header';
import '../App.css';
import NftCard from '../components/nftCard';

function Home() {
  const nftCards = Array.from({ length: 4 }, (_, index) => <NftCard key={index} />);

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex flex-wrap justify-center m-4'>
        {nftCards}
      </div>
    </div>
  );
}

export default Home;
