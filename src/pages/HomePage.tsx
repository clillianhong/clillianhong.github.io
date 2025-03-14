import React, { useEffect } from 'react';

import { IsMobileContext } from '../App';
import { UnloadGameContext } from '../App';

const HomePage: React.FC = () => {
  // const isMobile = React.useContext(IsMobileContext);
  // const [showMuseum, setShowMuseum] = React.useState<boolean>(true);
  // const {unloadGame, setUnloadGame} = React.useContext(UnloadGameContext);
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2 style={{color: 'red' }}> this website is under construction, but feel free to look around </h2>
      {/* <h2>Pan with mouse, navigate with arrow keys: </h2> */}
       {/* <GameMuseum /> */}
    </div>
  );
};

export default HomePage;
