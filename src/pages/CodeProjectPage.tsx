import React from 'react';
import WorkCard from '../components/WorkCard';
import Footer from '../components/Footer';
import data from '../data/code_monkey';

const CodeProjectsPage: React.FC = () => {
  return (
    <>
      <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
        <div className="container">
          <header className="section__header">
            <h2 className="section__title">Work & Projects</h2>
            <p className="section__subtitle">
              Building the future at the intersection of wearable tech and AI
            </p>
          </header>

          <div className="work-list">
            {data.map((work) => (
              <WorkCard key={work.title} work={work} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CodeProjectsPage;
