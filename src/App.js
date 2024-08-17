import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './libs/header';
import Footer from './libs/footer';
import Home from './pages/home';
import UserProfile from './pages/userProfile';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-profile/:address" element={<UserProfile />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;

