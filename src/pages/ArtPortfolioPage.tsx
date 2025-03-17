import React from 'react';
import { Link } from 'react-router-dom';
import Cell from '../components/Cell';
import data from '../data/projects';

const DESKTOP_PADDING_RATIO = 0.1;
const MOBILE_PADDING_RATIO = 0.05;

const MOBILE_FONT_SIZE_RATIO = 0.02;
const DESKTOP_FONT_SIZE_RATIO = 0.015;

const PortfolioPage: React.FC = () => {
  return (
    <div style={{backgroundColor:'#edeee5'}}>
      <h1 style={{fontSize: window.innerWidth < 600 ? window.innerWidth * MOBILE_FONT_SIZE_RATIO : window.innerWidth * DESKTOP_FONT_SIZE_RATIO}}>illustrations & comics</h1>
      {data.map((project) => (
        <div style={{ paddingLeft: window.innerWidth < 600 ? window.innerWidth * MOBILE_PADDING_RATIO : window.innerWidth * DESKTOP_PADDING_RATIO, paddingRight: window.innerWidth < 600 ? window.innerWidth * MOBILE_PADDING_RATIO : window.innerWidth * DESKTOP_PADDING_RATIO }} key={project.title}>
          <Cell data={project} />
        </div>
      ))}
    </div>
  )
};

export default PortfolioPage;
