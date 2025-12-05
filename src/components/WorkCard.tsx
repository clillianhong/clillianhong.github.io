import React from 'react';
import dayjs from 'dayjs';

export interface WorkData {
  title: string;
  subtitle?: string;
  image: string;
  date: string;
  desc: string;
  link?: string;
}

interface WorkCardProps {
  work: WorkData;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  const handleClick = () => {
    if (work.link) {
      window.open(work.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article
      className="work-card"
      onClick={work.link ? handleClick : undefined}
      style={{ cursor: work.link ? 'pointer' : 'default' }}
    >
      <img
        src={`${process.env.PUBLIC_URL}${work.image}`}
        alt={work.title}
        className="work-card__image"
        loading="lazy"
      />
      
      <div className="work-card__content">
        {work.subtitle && (
          <p className="work-card__company">{work.subtitle}</p>
        )}
        <h3 className="work-card__title">{work.title}</h3>
        <p className="work-card__description">{work.desc}</p>
        <p className="work-card__date">
          {work.subtitle?.toLowerCase().includes('since') 
            ? `Since ${dayjs(work.date).format('MMMM YYYY')}`
            : dayjs(work.date).format('MMMM YYYY')
          }
        </p>
      </div>
    </article>
  );
};

export default WorkCard;

