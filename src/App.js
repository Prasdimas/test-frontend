import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/pages/Login'; 
import Register from './component/pages/Register';
import Analytic from './component/pages/Analytic';
import Notfound from './component/pages/Notfound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Analytic />} /> 
        <Route path='*' element={<Notfound/>} />
      </Routes>
    </Router>
  );
}

export default App;
