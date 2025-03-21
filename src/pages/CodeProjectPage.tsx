import React from 'react';
import { Link } from 'react-router-dom';
import Cell from '../components/Cell';
import data from '../data/code_monkey';

const CodeProjectsPage: React.FC = () => {
  return (
    <div style={{backgroundColor:'#edeee5'}}>
      <h1>work</h1>
      {data.map((project) => (
        <div style={{ paddingLeft: window.innerWidth*0.1, paddingRight: window.innerWidth*0.1 }} key={project.title}>
          <Cell data={project} />
        </div>
      ))}
    </div>
  )
};

export default CodeProjectsPage;
