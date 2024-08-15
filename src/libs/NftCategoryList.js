import React from 'react';
import NftCard from '../components/nftCard';

const NftCategoryList = ({ categoryName, nftCards }) => {
  const handleScroll = (direction) => {
    const scrollAmount = window.innerWidth * 0.8;
    const container = document.querySelector(`#${categoryName.replace(/\s+/g, '-')}`);
    container.scrollBy({ 
      left: direction === 'left' ? -scrollAmount : scrollAmount, 
      behavior: 'smooth' 
    });
  };

  return (
    <div className='mb-8'>
      <div className='flex justify-center items-center text-3xl mb-4'>
        <a>{categoryName}</a>
      </div>
      <div className='relative flex items-center'>
        <button
          onClick={() => handleScroll('left')}
          className='p-2 text-4xl text-black rounded transition-transform duration-200 ease-in-out hover:text-gray-500 hover:scale-105'
        >
          &lt;
        </button>
        <div id={categoryName.replace(/\s+/g, '-')} className='flex overflow-x-hidden flex-1'>
          <div className='flex flex-nowrap p-4 snap-x snap-mandatory space-x-[4px]'>
            {nftCards.map((card, index) => (
              <div key={index} className='snap-start flex-shrink-0 w-1/8'>
                {card}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => handleScroll('right')}
          className='p-2 text-4xl text-black rounded transition-transform duration-200 ease-in-out hover:text-gray-500 hover:scale-105'
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default NftCategoryList;

