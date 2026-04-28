import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PromoBanner from './components/PromoBanner';
import ArtPortfolioPage from './pages/ArtPortfolioPage';
import CodeProjectsPage from './pages/CodeProjectPage';
import VesselBluePage from './pages/VesselBluePage';
import WheelTestPage from './pages/WheelTestPage';
import BookshelfPage from './pages/BookshelfPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PromoBanner />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ArtPortfolioPage />} />
            <Route path="/code" element={<CodeProjectsPage />} />
            <Route path="/vessel_blue" element={<VesselBluePage />} />
            <Route path="/wheel" element={<WheelTestPage />} />
            <Route path="/bookshelf" element={<BookshelfPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
