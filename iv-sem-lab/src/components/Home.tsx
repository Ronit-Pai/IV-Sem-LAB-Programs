import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Home: React.FC = () => {
  const courses = [
    { name: 'DAA', icon: '🔍', description: 'Design and Analysis of Algorithms' },
    { name: 'MP', icon: '⚙️', description: 'Microprocessors' },
    { name: 'DBMS', icon: '🗄️', description: 'Database Management Systems' },
    { name: 'UNIX', icon: '🖥️', description: 'Unix Operating System' },
  ];

  return (
    <div className="site-wrapper">
      <Header
        links={[
          { to: '/', label: 'Home' },
        ]}
      />

      <main>
        <section className="hero">
          <div className="hero-inner">
            <span className="eyebrow">Welcome to</span>
            <h1>IVth Sem Lab Programs</h1>
            <p className="subcopy">Access all your laboratory programs in one place</p>
            
            <div className="hero-glow">
              <div className="orb orb-a"></div>
              <div className="orb orb-b"></div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Choose the Course</h2>
          
          <div className="features">
            <div className="grid">
              {courses.map((course, index) => (
                <Link to={`/course/${course.name}`} key={index} className="stack-card">
                  <div className="stack-card-image" style={{background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)'}}>
                    <div className="stack-card-overlay">
                      <div className="stack-logo">{course.icon}</div>
                    </div>
                  </div>
                  <div className="stack-card-content">
                    <h3>{course.name}</h3>
                    <span className="stack-tagline">{course.description}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <section className="section" style={{ textAlign: 'center' }}>
  <button
    className="glow-btn"
    onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
  >
    Click Me !!!
  </button>
</section>

      </main>
    </div>
  );
};

export default Home;