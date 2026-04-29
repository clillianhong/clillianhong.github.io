import React from 'react';
import ComicDescriptionPage from '../components/ComicDescriptionPage';
import data from '../data/projects';

const project = data.find(p => p.title === 'Vessel Blue')!;

const VesselBluePage: React.FC = () => (
  <ComicDescriptionPage
    title={project.title}
    subtitle={project.subtitle}
    date={project.date}
    tagline="A genre and gender bending romantic fantasy."
    descriptions={[
      'Raised on the high seas, Kai knows the secret to staying alive is simple: take care of yourself and no one else. He has arrived on the shores of a fading Ming dynasty to steal the secret to magic, a secret for which Lin Ren holds the key.',
      'Ren is everything Kai is not — sheltered and gentle, they are an artist, not a warrior. In such dangerous times, Ren is not the kind of person who survives for long. It\'s just his luck that Kai finds himself cursed with an impossible task: keeping Ren alive, when the whole world seems to want them dead.',
    ]}
    coverImage={project.image}
    status="Coming Soon"
    substackUrl="https://vesselblue.substack.com/embed"
  />
);

export default VesselBluePage;
