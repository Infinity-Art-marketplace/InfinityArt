import React from 'react';
import Footer from '../libs/footer';
import Header from '../libs/header';
import '../App.css';
import NftCategoryList from '../libs/NftCategoryList';
import NftCard from '../components/nftCard';

function Home() {
  const nftCardsCategory1 = Array.from({ length: 35 }, (_, index) => <NftCard key={index} />);
  const nftCardsCategory2 = Array.from({ length: 24 }, (_, index) => <NftCard key={index} />);
  
  return (
    <div className='flex flex-col bg-gradient-to-b from-white to-purple-200'>
      <Header />
      <section className='flex flex-col'>
        <NftCategoryList categoryName="DEFI" nftCards={nftCardsCategory1} />
        <NftCategoryList categoryName="games" nftCards={nftCardsCategory2} />
        <NftCategoryList categoryName="art" nftCards={nftCardsCategory1} />
        <NftCategoryList categoryName="DAOs" nftCards={nftCardsCategory2} />
      </section>
      <Footer />
    </div>
  );
}

export default Home;

