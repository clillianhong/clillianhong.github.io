import React, { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface LayoutProps {
  children: React.ReactNode;
}
type UnloadGameFunction = {
  unloadGame: () => void;
  setUnloadGame: React.Dispatch<React.SetStateAction<() => void>>;
};

const defaultUnloadGame: UnloadGameFunction = {
  unloadGame: async () => {
    console.log('Unloading game');
  },
  setUnloadGame: () => {}
};

export const UnloadGameContext = createContext<UnloadGameFunction>(defaultUnloadGame);
export const IsMobileContext = createContext<boolean>(false);

const Layout = ({children} : LayoutProps) => {
  const [menuWidth, setMenuWidth] = useState(0);
  const [unloadGame, setUnloadGame] = useState<UnloadGameFunction['unloadGame']>(defaultUnloadGame.unloadGame);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const unloadGameRef = useRef<typeof unloadGame>(unloadGame);

  useEffect(() => {
    unloadGameRef.current = unloadGame;
  }, [unloadGame]);

  useEffect(() => {
    const onWindowResize = async () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', () => onWindowResize);
  }, [unloadGame, setIsMobile]);

  const handleResize = (width: number) => {
    console.log('resizing to width ' + width)
    setMenuWidth(width);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `${menuWidth}px 1fr` }}>
      <IsMobileContext.Provider value={isMobile}>
      <UnloadGameContext.Provider value={{unloadGame, setUnloadGame}}>
        <Menu onWidthChange={(width) => handleResize(width)} />
          {/* <button onClick={unloadGame}>Unload Game</button> */}
        <main>{children}</main>
      </UnloadGameContext.Provider>
      </IsMobileContext.Provider>
    </div>
  );
};

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-family)',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <div className="App" >
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/projects" element={<ProjectsPage/>} />
        </Routes>
      </Layout>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>


      </header> */}
    </div>
    </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
