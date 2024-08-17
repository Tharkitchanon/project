import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Analysis from './components/Analysis';
import KnowledgePage from './components/KnowledgePage';
import Ai from './components/Ai'; // ให้แน่ใจว่า Ai.js มีการส่งออกคอมโพเนนต์

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/KnowledgePage" element={<KnowledgePage />} />
        <Route path="/ai" element={<Ai />} /> {/* แก้ไขการใช้ element */}
      </Routes>
    </Router>
  );
}

export default App;
