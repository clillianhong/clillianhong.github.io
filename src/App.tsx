import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PromoBanner from './components/PromoBanner';
import ArtPortfolioPage from './pages/ArtPortfolioPage';
import CodeProjectsPage from './pages/CodeProjectPage';
import VesselBluePage from './pages/VesselBluePage';
import WheelTestPage from './pages/WheelTestPage';
import BookshelfPage from './pages/BookshelfPage';
import MillenniaMuseumPage from './pages/MillenniaMuseumPage';
import MemoryWavesPage from './pages/MemoryWavesPage';
import FlotsamJetsamPage from './pages/FlotsamJetsamPage';
import QingmingJiePage from './pages/QingmingJiePage';
import OceanTestPage from './pages/OceanTestPage';
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
            <Route path="/millennia_museum" element={<MillenniaMuseumPage />} />
            <Route path="/memory_waves" element={<MemoryWavesPage />} />
            <Route path="/flotsam_jetsam" element={<FlotsamJetsamPage />} />
            <Route path="/qingming_jie" element={<QingmingJiePage />} />
            <Route path="/ocean" element={<OceanTestPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
