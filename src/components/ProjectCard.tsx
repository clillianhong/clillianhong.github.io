import React from 'react';
import dayjs from 'dayjs';

export interface ProjectData {
  title: string;
  subtitle?: string;
  image: string;
  date: string;
  desc: string;
  link?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  // Extract category from subtitle (e.g., "Illustration | Digital" -> "Illustration")
  const category = project.subtitle?.split('|')[0]?.trim() || '';
  
  const handleClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    } else if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className="project-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.title}`}
    >
      <div className="project-card__image-wrapper">
        <img
          src={`${process.env.PUBLIC_URL}${project.image}`}
          alt={project.title}
          className="project-card__image"
          loading="lazy"
        />
        <div className="project-card__overlay" />
        
        {/* Details shown on hover (desktop) / always visible (mobile) */}
        <div className="project-card__details">
          {category && (
            <p className="project-card__category">{category}</p>
          )}
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__description">{project.desc}</p>
        </div>
      </div>

      {/* Card content shown below image (hidden on mobile via CSS) */}
      <div className="project-card__content">
        {category && (
          <p className="project-card__category">{category}</p>
        )}
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__date">
          {dayjs(project.date).format('MMMM YYYY')}
        </p>
      </div>
    </article>
  );
};

export default ProjectCard;

