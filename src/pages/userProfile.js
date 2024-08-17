import React from 'react';
import UserBanner from '../components/UserBanner';
import AboutUser from '../libs/AboutUserBar';
import NftCategoryList from '../libs/NftCategoryList';
import NftCard from '../components/nftCard';

const UserProfile = () => {
    const DEFI = Array.from({ length: 35 }, (_, index) => <NftCard key={index} />);

  return (
    <div className="container mx-auto p-4">
      <UserBanner />
      <div className="flex mt-6">
        <div className="w-1/4">
          <AboutUser />
        </div>
        <div className="w-3/4 ml-6">
          <h2 className="text-xl font-bold mb-4">Atividades Recentes</h2>
          <p>Conteúdo adicional ou feed de atividades pode ser adicionado aqui.</p>
        <NftCategoryList categoryName="DEFI" nftCards={DEFI} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

