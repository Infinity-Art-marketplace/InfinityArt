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
          className='absolute left-0 h-full w-12 text-4xl text-black bg-gray-200 opacity-0 hover:opacity-80 hover:rounded-full transition-all duration-300 ease-in-out hover:text-black'
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
          className='absolute right-0 h-full w-12 text-4xl text-black bg-gray-200 opacity-0 hover:opacity-80 hover:rounded-full transition-all duration-300 ease-in-out hover:text-black'
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default NftCategoryList;

