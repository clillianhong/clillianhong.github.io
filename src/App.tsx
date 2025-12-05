import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ArtPortfolioPage from './pages/ArtPortfolioPage';
import CodeProjectsPage from './pages/CodeProjectPage';
import WheelTestPage from './pages/WheelTestPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ArtPortfolioPage />} />
            <Route path="/code" element={<CodeProjectsPage />} />
            <Route path="/wheel" element={<WheelTestPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
