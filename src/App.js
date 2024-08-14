import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Register from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import Analysis from './components/Analysis';
import ElectricityDisplay from './components/ElectricityDisplay';
import Ai from './components/Ai'; // ให้แน่ใจว่า Ai.js มีการส่งออกคอมโพเนนต์

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/electricity" element={<ElectricityDisplay />} />
        <Route path="/ai" element={<Ai />} /> {/* แก้ไขการใช้ element */}
      </Routes>
    </Router>
  );
}

export default App;
