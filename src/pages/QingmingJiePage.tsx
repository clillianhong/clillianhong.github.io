import React from 'react';
import ComicDescriptionPage from '../components/ComicDescriptionPage';
import data from '../data/projects';

const project = data.find(p => p.title === 'Rose Medallion Qingming Jie')!;

const QingmingJiePage: React.FC = () => (
  <ComicDescriptionPage
    title={project.title}
    subtitle={project.subtitle}
    date={project.date}
    descriptions={[project.desc]}
    coverImage={project.image}
  />
);

export default QingmingJiePage;
