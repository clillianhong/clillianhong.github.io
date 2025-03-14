import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameMuseum from './pages/GameMuseum';
import ProjectsPage from './pages/ProjectsPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({children} : LayoutProps) => {
  const [menuWidth, setMenuWidth] = useState(0);

  const handleResize = (width: number) => {
    console.log('resizing to width ' + width)
    setMenuWidth(width);
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `${menuWidth}px 1fr` }}>
        <Menu onWidthChange={(width) => handleResize(width)} />
        <main>{children}</main>

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
