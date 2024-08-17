import React from 'react';
import Banner from '../components/banner';
import bannerImage1 from '../components/cropped_image_512x512.png'; // Sua imagem original
import bannerImage2 from '../components/cropped_image_512x512.png'; // Outra imagem para exemplo

const bannersData = [
  {
    id: 1,
    title: 'Crypto Art Collection',
    subtitle: 'Exclusive NFT Drops',
    price: 'Starting at 0.05 ETH',
    image: bannerImage1,
    buttonLabel: 'Explore Now',
    background: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600',
  },
  {
    id: 2,
    title: 'DeFi Revolution',
    subtitle: 'Yield Farming Made Easy',
    price: 'Earn up to 20% APY',
    image: bannerImage2,
    buttonLabel: 'Join Today',
    background: 'bg-gradient-to-r from-teal-500 via-green-500 to-lime-500',
  },
];

const BannerList = () => {
  const handleScroll = (direction) => {
    const container = document.querySelector('#banner-scroll-container');
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative mb-8">
      <div className="relative flex items-center">
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 h-full w-12 text-4xl text-black bg-white opacity-0 hover:opacity-100 hover:rounded-full transition-all duration-300 ease-in-out hover:text-black z-10"
        >
          &lt;
        </button>
        <div id="banner-scroll-container" className="flex overflow-x-hidden scrollbar-hide flex-1 snap-x snap-mandatory">
          {bannersData.map((banner) => (
            <div key={banner.id} className="flex-shrink-0 w-full snap-start">
              <Banner
                title={banner.title}
                subtitle={banner.subtitle}
                price={banner.price}
                image={banner.image}
                buttonLabel={banner.buttonLabel}
                background={banner.background}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 h-full w-12 text-4xl text-black bg-white opacity-0 hover:opacity-100 hover:rounded-full transition-all duration-300 ease-in-out hover:text-black z-10"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default BannerList;

