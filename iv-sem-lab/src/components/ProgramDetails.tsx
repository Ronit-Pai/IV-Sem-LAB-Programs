import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Params = {
  courseName?: string;
  programName?: string;
};

const inferLanguage = (course: string, fileName: string): string => {
  const lowerCourse = course.toLowerCase();
  const lowerFile = fileName.toLowerCase();

  if (lowerCourse === 'dbms' || lowerFile.endsWith('.sql')) return 'sql';
  if (lowerCourse === 'mp' || lowerFile.endsWith('.asm')) return 'nasm';
  if (lowerFile.endsWith('.pl')) return 'perl';
  if (lowerFile.endsWith('.sh')) return 'bash';
  if (lowerFile.endsWith('.awk')) return 'awk';

  // DAA files are text files that contain algorithm programs.
  if (lowerCourse === 'daa') return 'cpp';

  return 'text';
};

const ProgramDetails: React.FC = () => {
  const { courseName, programName } = useParams<Params>();
  const [programContent, setProgramContent] = useState<string>('');
  const [codeLanguage, setCodeLanguage] = useState<string>('text');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramContent = async () => {
      try {
        if (!courseName || !programName) {
          setProgramContent('// Error: Course or program name not provided');
          setLoading(false);
          return;
        }

        // Decode the program name and map it to the correct file name
        const decodedProgramName = decodeURIComponent(programName);
        
        // Determine file extension based on course
        let fileName = '';
        if (courseName.toLowerCase() === 'daa') {
          fileName = `${decodedProgramName}.txt`;
        } else if (courseName.toLowerCase() === 'mp') {
          fileName = `${decodedProgramName}.ASM`;
        } else if (courseName.toLowerCase() === 'dbms') {
          fileName = `${decodedProgramName}.sql`;
        } else if (courseName.toLowerCase() === 'unix') {
          // For UNIX, we'll try multiple approaches to find the correct file
          // First, check if the programName already includes an extension
          if (decodedProgramName.includes('.')) {
            // If the programName already has an extension, use it as-is
            fileName = decodedProgramName;
          } else {
            // If no extension, try to determine the correct one
            // We'll try common extensions in order of priority
            const extensionsToTry = ['.txt', '.sh', '.pl', '.awk', '']; // Note: empty string for files without extension
            
            let found = false;
            for (const ext of extensionsToTry) {
              const testFileName = `${decodedProgramName}${ext}`;
              try {
                const response = await fetch(`/data/${courseName.toLowerCase()}/${testFileName}`);
                
                if (response.ok) {
                  // Check if the response is actually text content and not HTML
                  const content = await response.text();
                  
                  // If content starts with '<' it might be HTML, so we should try the next extension
                  if (!content.trim().startsWith('<')) {
                    fileName = testFileName;
                    setProgramContent(content);
                    setCodeLanguage(inferLanguage(courseName, testFileName));
                    found = true;
                    break;
                  }
                }
              } catch (err) {
                // Continue to next extension if there's an error
                continue;
              }
            }
            
            if (!found) {
              // If no file found with any extension, try the original name as-is
              fileName = decodedProgramName;
              setProgramContent(`// Error: Could not find file ${decodedProgramName} with common extensions`);
              setLoading(false);
              return; // Exit early since we've handled the response
            }
          }
        }

        // If we reach here, fileName has been set
        if (!fileName) {
          setProgramContent('// Error: Could not determine file name');
          setLoading(false);
          return;
        }

        // Only fetch if the content hasn't been set yet (in the loop above)
        // If fileName is already set but programContent is still empty, fetch the content
        if (programContent === '') {
          const response = await fetch(`/data/${courseName.toLowerCase()}/${fileName}`);

          if (response.ok) {
            const content = await response.text();
            // Check if the content looks like HTML (starts with <html>, <head>, <body>, etc.)
            if (content.trim().startsWith('<')) {
              setProgramContent(`// Error: Unexpected HTML content received instead of program code\n// File: ${fileName}\n// Please check if the file exists and is accessible`);
              setCodeLanguage('text');
            } else {
              setProgramContent(content);
              setCodeLanguage(inferLanguage(courseName, fileName));
            }
          } else {
            setProgramContent(`// Error: Could not load program content\n// File: ${fileName}\n// Status: ${response.status} ${response.statusText}`);
            setCodeLanguage('text');
          }
        }
      } catch (error) {
        console.error('Error fetching program content:', error);
        setProgramContent('// Error: Could not load program content due to network error');
        setCodeLanguage('text');
      } finally {
        setLoading(false);
      }
    };

    fetchProgramContent();
  }, [courseName, programName]); // Dependencies array is correct

  // Get associated downloads for UNIX programs
  const getAssociatedDownloads = () => {
    if (courseName?.toLowerCase() !== 'unix' || !programName) return [];
    
    const decodedProgramName = decodeURIComponent(programName);
    // Check if the program name matches awk1, awk2, or awk3 (without extension)
    const baseName = decodedProgramName.split('.')[0]; // Split by dot and take first part
    const assocFiles: Record<string, string[]> = {
      'awk1': ['sales_data'],
      'awk2': ['emp'],
      'awk3': ['textfile']
    };
    
    return assocFiles[baseName] || [];
  };

  const navLinks = courseName
    ? [
        { to: '/', label: 'Home' },
        { to: `/course/${courseName}`, label: courseName },
      ]
    : [{ to: '/', label: 'Home' }];

  const associatedDownloads = getAssociatedDownloads();

  return (
    <div className="site-wrapper">
      <Header links={navLinks} />

      <main style={{ paddingTop: '80px' }}>
        <div className="full-program-layout">
          <div className="program-section">
            <h3>Program Code</h3>
            <div className="program-code-full">
              <SyntaxHighlighter
                language={codeLanguage}
                style={oneDark}
                customStyle={{ margin: 0, borderRadius: '8px' }}
                showLineNumbers
                wrapLongLines
              >
                {loading ? 'Loading program...' : programContent}
              </SyntaxHighlighter>
            </div>
            
            {/* Show associated download buttons for UNIX programs */}
            {associatedDownloads.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h4>Data Files:</h4>
                {associatedDownloads.map((fileName, index) => (
                  <a
                    key={index}
                    href={`/data/${courseName!.toLowerCase()}/${fileName}`}
                    download={fileName}
                    className="download-btn"
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      margin: '5px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Download {fileName}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgramDetails;