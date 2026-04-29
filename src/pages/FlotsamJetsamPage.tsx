import React from 'react';
import ComicDescriptionPage from '../components/ComicDescriptionPage';
import data from '../data/projects';

const project = data.find(p => p.title === 'Flotsam, Jetsam')!;

const FlotsamJetsamPage: React.FC = () => (
  <ComicDescriptionPage
    title={project.title}
    subtitle={project.subtitle}
    date={project.date}
    descriptions={[
      'After the untimely death of a princess, her loyal servant ventures downstream to the underworld in an attempt to save her. A short story and re-interpretation of Nüwa, the Chinese mother goddess of creation.',
    ]}
    coverImage={project.image}
  />
);

export default FlotsamJetsamPage;
