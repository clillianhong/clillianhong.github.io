import React from 'react';
import ComicDescriptionPage from '../components/ComicDescriptionPage';
import data from '../data/projects';

const project = data.find(p => p.title === 'Memory Waves')!;

const MemoryWavesPage: React.FC = () => (
  <ComicDescriptionPage
    title={project.title}
    subtitle={project.subtitle}
    date={project.date}
    descriptions={[
      'Reincarnated in the modern world, an empress flashes back to her past lives after encountering a museum exhibit about her ancient deeds. This story was the precursor to "Millennia Museum".',
    ]}
    coverImage={project.image}
  />
);

export default MemoryWavesPage;
