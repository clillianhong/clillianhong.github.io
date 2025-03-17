import React, { useEffect } from 'react';

import { IsMobileContext } from '../App';
import { UnloadGameContext } from '../App';
import Cell from '../components/Cell';

const HomePage: React.FC = () => {
  // const isMobile = React.useContext(IsMobileContext);
  // const [showMuseum, setShowMuseum] = React.useState<boolean>(true);
  // const {unloadGame, setUnloadGame} = React.useContext(UnloadGameContext);
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2 style={{color: 'red' }}> this website is under construction, but feel free to look around </h2>
      {/* <h2>Pan with mouse, navigate with arrow keys: </h2> */}
       {/* <GameMuseum /> */}
       <Cell data={{
        title: 'Title',
        image: '/pixel_wave_transparent.png',
        date: '2022-01-01',
        desc: 'Description',
      }} />
    </div>
  );
};

export default HomePage;
