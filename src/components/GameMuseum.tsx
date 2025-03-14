import React, { useCallback, useContext, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { UnloadGameContext } from '../App';
import { IsMobileContext } from '../App';

const GameMuseum: React.FC = () => {

  const isMobile = useContext(IsMobileContext);
  const { unityProvider, unload} = useUnityContext({
    loaderUrl: "Build/portfolio_game.loader.js",
    dataUrl: "Build/portfolio_game.data",
    frameworkUrl: "Build/portfolio_game.framework.js",
    codeUrl: "Build/portfolio_game.wasm",
  });

  async function unloadGameChildAsync() {
    try {
    await unload();
    // Ready to navigate to another page.
  } catch (error) {
    console.error('Error unloading game:', error);
    // Handle error or rethrow if necessary
  }
    // Ready to navigate to another page.
  }

  const unloadGameChild = useCallback(() => {
    unloadGameChildAsync()
}, []);

  const { unloadGame, setUnloadGame } = useContext(UnloadGameContext);

  useEffect(() => {
    setUnloadGame(unloadGameChildAsync); //setting this so parent components can unload game. must unload game before navigating to new page!
  }, []); // Only run once, when the component mounts


  return(
    <div>
      <Unity unityProvider={unityProvider} style={{ width: isMobile ? 300 : 1200, height: isMobile ? 200 : 800 }} />
    </div>
  )
};

export default GameMuseum;
