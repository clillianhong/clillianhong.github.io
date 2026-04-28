import React from 'react';
import ComicDescriptionPage from '../components/ComicDescriptionPage';

const MillenniaMuseumPage: React.FC = () => (
  <ComicDescriptionPage
    title="Millennia Museum"
    label="Comic | Risograph printed"
    descriptions={[
      'Two ancient enemies fall through time into a strange museum where the new exhibit features their own ancient past and unknown future. A silent short story.',
    ]}
    coverImage="/project_title_cards/comics/millennia_museum_cover.png"
  />
);

export default MillenniaMuseumPage;
