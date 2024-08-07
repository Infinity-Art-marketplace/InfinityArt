import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import CreateUserForm from './pages/CreateUserForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createuser" element={<CreateUserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
