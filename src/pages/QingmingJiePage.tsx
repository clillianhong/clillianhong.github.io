import React from 'react';
import ComicDescriptionPage from '../components/ComicDescriptionPage';

const QingmingJiePage: React.FC = () => (
  <ComicDescriptionPage
    title="Rose Medallion Qingming Jie"
    label="Comic | Risograph printed"
    descriptions={[
      'This plate shaped comic commemorates celebrating Qingming Jie with my family as a child. The comic takes place in the panels of a Rose Medallion plate, a traditional Chinese export ware that features the colorful flora and fauna of tropical south China, where these plates were historically manufactured, coupled with western art motifs like the window panels showing narrative scenes.',
    ]}
    coverImage="/project_title_cards/comics/qingmingjie_plate.png"
  />
);

export default QingmingJiePage;
