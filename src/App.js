import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import Dashboard from './pages/Dashboard';
import AlertsPaged from './pages/AlertsPaged';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 text-gray-800 min-h-screen">
        <HeaderBar />
        <main className="pt-[70px] p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<AlertsPaged />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
