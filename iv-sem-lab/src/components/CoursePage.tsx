import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';

interface Program {
  name: string;
  fileName: string;
}

const CoursePage: React.FC = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch program names based on course
    const fetchPrograms = async () => {
      try {
        // In a real scenario, this would be an API call
        // For now, we'll simulate based on the course name
        if (courseName?.toLowerCase() === 'daa') {
          // Read the files in the data/daa directory
          const daaFiles = [
            { name: 'Bubble Sort', fileName: 'bubbleSort.txt' },
            { name: 'Merge Sort', fileName: 'mergeSort.txt' },
            { name: 'Selection Sort', fileName: 'selectionSort.txt' },
            { name: 'String Matching', fileName: 'stringMatch.txt' }
          ];
          setPrograms(daaFiles);
        } else {
          // For other courses, we'll have empty arrays since we don't have actual data files
          setPrograms([]);
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [courseName]);

  return (
    <div className="site-wrapper">
      <Header
        links={[
          { to: '/', label: 'Home' },
        ]}
      />

      <main>
        <section className="details-hero">
          <div className="details-hero-content">
            <div className="stack-header">
              <div className="stack-logo-large">
                {courseName === 'DAA' && '🔍'}
                {courseName === 'MP' && '⚙️'}
                {courseName === 'DBMS' && '🗄️'}
                {courseName === 'UNIX' && '🖥️'}
              </div>
              <div>
                <h1>{courseName}</h1>
                <p className="stack-tagline-large">
                  {courseName === 'DAA' && 'Design and Analysis of Algorithms'}
                  {courseName === 'MP' && 'Microprocessors'}
                  {courseName === 'DBMS' && 'Database Management Systems'}
                  {courseName === 'UNIX' && 'Unix Operating System'}
                </p>
              </div>
            </div>
            <p className="stack-description">
              Browse through all the laboratory programs for {courseName}. Click on any program to view its implementation and details.
            </p>
          </div>
        </section>

        <section className="section">
          <h2>Programs</h2>
          
          {loading ? (
            <p>Loading programs...</p>
          ) : programs.length > 0 ? (
            <div className="stack-details-main">
              <div className="sidebar">
                <h3>Lab Programs</h3>
                <ul>
                  {programs.map((program, index) => (
                    <li key={index}>
                      <Link to={`/program/${courseName}/${program.fileName.replace('.txt', '')}`}>
                        {program.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="content">
                <div className="content-card">
                  <h3>About {courseName} Programs</h3>
                  <p>
                    This section contains all the laboratory programs for {courseName}. 
                    Each program is implemented according to the curriculum requirements.
                  </p>
                  
                  <h4>Available Programs:</h4>
                  <ul>
                    {programs.map((program, index) => (
                      <li key={index}>
                        <Link to={`/program/${courseName}/${program.fileName.replace('.txt', '')}`}>
                          {program.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="content-card">
              <h3>No Programs Available</h3>
              <p>
                No programs are currently available for {courseName}. 
                More programs will be added soon.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CoursePage;