import React from 'react';
import '../App.css';
import NftCategoryList from '../libs/NftCategoryList';
import NftCard from '../components/nftCard';
import Banner from '../components/banner';
function Home() {
  const DEFI = Array.from({ length: 35 }, (_, index) => <NftCard key={index} />);
  const games = Array.from({ length: 24 }, (_, index) => <NftCard key={index} />);
  const art = Array.from({ length: 3 }, (_, index) => <NftCard key={index} />);
  const DAOs = Array.from({ length: 6 }, (_, index) => <NftCard key={index} />);
  
  return (
    <div className='flex flex-col bg-gradient-to-b from-white to-purple-200'>
      <Banner />
      <section className='flex flex-col'>
        <NftCategoryList categoryName="DEFI" nftCards={DEFI} />
        <NftCategoryList categoryName="games" nftCards={games} />
        <NftCategoryList categoryName="art" nftCards={art} />
        <NftCategoryList categoryName="DAOs" nftCards={DAOs} />
      </section>
    </div>
  );
}

export default Home;

