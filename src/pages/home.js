import React from 'react';
import '../App.css';
import NftCategoryList from '../libs/NftCategoryList';
import NftCard from '../components/nftCard';
import Banner from '../components/banner';
function Home() {
  const nftCardsCategory1 = Array.from({ length: 35 }, (_, index) => <NftCard key={index} />);
  const nftCardsCategory2 = Array.from({ length: 24 }, (_, index) => <NftCard key={index} />);
  
  return (
    <div className='flex flex-col bg-gradient-to-b from-white to-purple-200'>
      <Banner />
      <section className='flex flex-col'>
        <NftCategoryList categoryName="DEFI" nftCards={nftCardsCategory1} />
        <NftCategoryList categoryName="games" nftCards={nftCardsCategory2} />
        <NftCategoryList categoryName="art" nftCards={nftCardsCategory1} />
        <NftCategoryList categoryName="DAOs" nftCards={nftCardsCategory2} />
      </section>
    </div>
  );
}

export default Home;

