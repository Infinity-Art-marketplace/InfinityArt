import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './libs/header';
import Footer from './libs/footer';
import Home from './pages/home';
import UserProfile from './pages/userProfile';
import CreateNFTs from './pages/createNFTs';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-profile/:address" element={<UserProfile />} />
        <Route path="/create-nfts" element={<CreateNFTs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

