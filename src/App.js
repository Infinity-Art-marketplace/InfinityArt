import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './libs/header';
import Footer from './libs/footer';

import Home from './pages/home';
import UserProfile from './pages/userProfile';
import CreateNFTs from './pages/createNFTs';
import NFTPage from './pages/NFTpage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-profile/:address" element={<UserProfile />} />
        <Route path="/create-nfts" element={<CreateNFTs />} />
        <Route path='/nft-page' element={<NFTPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

