import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';

interface Program {
  name: string;
  fileName: string;
  type: 'view' | 'download' | 'associated-download'; // 'view' for code display, 'download' for downloadable files, 'associated-download' for files linked with other programs
}

const CoursePage: React.FC = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch program names based on course
    const fetchPrograms = async () => {
      try {
        if (!courseName) {
          setPrograms([]);
          return;
        }
        
        // In a real scenario, this would be an API call
        // For now, we'll simulate based on the course name
        if (courseName.toLowerCase() === 'daa') {
          // Read the files in the data/daa directory
          const daaFiles: Program[] = [
            { name: 'Bubble Sort', fileName: 'bubbleSort.txt', type: 'view' },
            { name: 'Merge Sort', fileName: 'mergeSort.txt', type: 'view' },
            { name: 'Selection Sort', fileName: 'selectionSort.txt', type: 'view' },
            { name: 'String Matching', fileName: 'stringMatch.txt', type: 'view' },
            { name: 'BFS Algorithm', fileName: 'bfs.txt', type: 'view' },
            { name: 'DFS Algorithm', fileName: 'dfs.txt', type: 'view' },
            { name: 'Insertion Sort', fileName: 'insertionSort.txt', type: 'view' },
            { name: 'Quick Sort', fileName: 'quicksort.txt', type: 'view' },
            { name: 'Topological Sort', fileName: 'topo.txt', type: 'view' },
            { name: 'Floyd-Warshall Algorithm', fileName: 'floyd.txt', type: 'view' },
            { name: 'Heap Sort', fileName: 'heapSort.txt', type: 'view' },
            { name: 'Horspool Algorithm', fileName: 'horsepool.txt', type: 'view' },
            { name: 'Knapsack Problem', fileName: 'knapsack.txt', type: 'view' },
            { name: 'Warshall Algorithm', fileName: 'warshall.txt', type: 'view' }
          ];
          setPrograms(daaFiles);
        } else if (courseName.toLowerCase() === 'mp') {
          const mpFiles: Program[] = [
            { name: 'EXP01.ASM', fileName: 'EXP01.ASM', type: 'view' },
            { name: 'EXP02.ASM', fileName: 'EXP02.ASM', type: 'view' },
            { name: 'EXP03.ASM', fileName: 'EXP03.ASM', type: 'view' },
            { name: 'EXP04.ASM', fileName: 'EXP04.ASM', type: 'view' },
            { name: 'EXP05.ASM', fileName: 'EXP05.ASM', type: 'view' },
            { name: 'EXP06.ASM', fileName: 'EXP06.ASM', type: 'view' },
            { name: 'EXP07.ASM', fileName: 'EXP07.ASM', type: 'view' },
            { name: 'EXP08.ASM', fileName: 'EXP08.ASM', type: 'view' }
          ];
          setPrograms(mpFiles);
        } else if (courseName.toLowerCase() === 'dbms') {
          const dbmsFiles: Program[] = [
            { name: 'BOOK DEALER.sql', fileName: 'BOOK DEALER.sql', type: 'view' },
            { name: 'bank_db.sql', fileName: 'bank_db.sql', type: 'view' },
            { name: 'insurance.sql', fileName: 'insurance.sql', type: 'view' },
            { name: 'order_db.sql', fileName: 'order_db.sql', type: 'view' },
            { name: 'student_enroll.sql', fileName: 'student_enroll.sql', type: 'view' }
          ];
          setPrograms(dbmsFiles);
        } else if (courseName.toLowerCase() === 'unix') {
          const unixFiles: Program[] = [
            { name: 'awk1.txt', fileName: 'awk1.txt', type: 'view' },
            { name: 'awk2.txt', fileName: 'awk2.txt', type: 'view' },
            { name: 'awk3.txt', fileName: 'awk3.txt', type: 'view' },
            { name: 'program1.sh', fileName: 'program1.sh', type: 'view' },
            { name: 'program10.sh', fileName: 'program10.sh', type: 'view' },
            { name: 'program2.sh', fileName: 'program2.sh', type: 'view' },
            { name: 'program3.sh', fileName: 'program3.sh', type: 'view' },
            { name: 'program4.sh', fileName: 'program4.sh', type: 'view' },
            { name: 'program5.sh', fileName: 'program5.sh', type: 'view' },
            { name: 'program6.sh', fileName: 'program6.sh', type: 'view' },
            { name: 'program7.sh', fileName: 'program7.sh', type: 'view' },
            { name: 'program8.sh', fileName: 'program8.sh', type: 'view' },
            { name: 'program9.sh', fileName: 'program9.sh', type: 'view' },
            { name: 'prog1.pl', fileName: 'prog1.pl', type: 'view' },
            { name: 'prog2.pl', fileName: 'prog2.pl', type: 'view' }
          ];
          setPrograms(unixFiles);
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

  // Get associated downloads for UNIX programs
  const getAssociatedDownloads = (programName: string) => {
    if (courseName?.toLowerCase() !== 'unix') return [];
    
    // Map AWK programs to their associated data files
    const associatedFiles: Record<string, string[]> = {
      'awk1.txt': ['sales_data'],
      'awk2.txt': ['emp'],
      'awk3.txt': ['textfile']
    };
    
    return associatedFiles[programName] || [];
  };

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
                  {programs.map((program, index) => {
                    if (program.type === 'view') {
                      // Extract the base name without extension for the URL
                      const programBaseName = program.fileName.replace(/\.[^/.]+$/, '');
                      
                      return (
                        <li key={index}>
                          <Link to={`/program/${courseName}/${encodeURIComponent(programBaseName)}`}>
                            {program.name}
                          </Link>
                          {courseName?.toLowerCase() === 'unix' && getAssociatedDownloads(program.fileName).map((assocFile, idx) => (
                            <span key={idx} style={{ marginLeft: '10px' }}>
                              <a 
                                href={`/data/${courseName!.toLowerCase()}/${assocFile}`}
                                download={assocFile}
                                style={{ textDecoration: 'none', fontSize: '0.8em', color: '#66aaff' }}
                              >
                                ({assocFile} - Download)
                              </a>
                            </span>
                          ))}
                        </li>
                      );
                    } else if (program.type === 'download') {
                      return (
                        <li key={index}>
                          <a 
                            href={`/data/${courseName!.toLowerCase()}/${program.fileName}`}
                            download={program.fileName}
                            style={{ textDecoration: 'none' }}
                          >
                            {program.name} (Download)
                          </a>
                        </li>
                      );
                    }
                    return null;
                  })}
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
                    {programs.map((program, index) => {
                      if (program.type === 'view') {
                        // Extract the base name without extension for the URL
                        const programBaseName = program.fileName.replace(/\.[^/.]+$/, '');
                        
                        return (
                          <li key={index}>
                            <Link to={`/program/${courseName}/${encodeURIComponent(programBaseName)}`}>
                              {program.name}
                            </Link>
                            {courseName?.toLowerCase() === 'unix' && getAssociatedDownloads(program.fileName).map((assocFile, idx) => (
                              <span key={idx} style={{ marginLeft: '10px' }}>
                                <a 
                                  href={`/data/${courseName!.toLowerCase()}/${assocFile}`}
                                  download={assocFile}
                                  style={{ textDecoration: 'none', fontSize: '0.8em', color: '#66aaff' }}
                                >
                                  ({assocFile} - Download)
                                </a>
                              </span>
                            ))}
                          </li>
                        );
                      } else if (program.type === 'download') {
                        return (
                          <li key={index}>
                            <a 
                              href={`/data/${courseName!.toLowerCase()}/${program.fileName}`}
                              download={program.fileName}
                              style={{ textDecoration: 'none' }}
                            >
                              {program.name} (Download)
                            </a>
                          </li>
                        );
                      }
                      return null;
                    })}
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