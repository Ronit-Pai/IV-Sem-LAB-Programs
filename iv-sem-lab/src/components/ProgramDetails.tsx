import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

type Params = {
  courseName?: string;
  programName?: string;
};

const ProgramDetails: React.FC = () => {
  const { courseName, programName } = useParams<Params>();
  const [programContent, setProgramContent] = useState<string>('');
  const [sampleOutput, setSampleOutput] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramContent = async () => {
      try {
        if (!courseName || !programName) {
          setProgramContent('// Error: Course or program name not provided');
          setSampleOutput('Error: Course or program name not provided');
          return;
        }

        // Map programName to filename
        const fileMap: Record<string, string> = {
          bubbleSort: 'bubbleSort.txt',
          mergeSort: 'mergeSort.txt',
          selectionSort: 'selectionSort.txt',
          stringMatch: 'stringMatch.txt',
        };

        const fileName = fileMap[programName];

        if (!fileName) {
          setProgramContent('// Program file not found');
          setSampleOutput('Program file not found');
          return;
        }

        // Fetch program code
        const response = await fetch(`/data/${courseName.toLowerCase()}/${fileName}`);

        if (response.ok) {
          const content = await response.text();
          setProgramContent(content);
        } else {
          setProgramContent('// Error: Could not load program content');
        }

        // Perfected sample outputs
        let output = '';

        switch (programName) {
          case 'bubbleSort':
            output = `Input:
64 34 25 12 22 11 90

Expected Output:
Original array:
64 34 25 12 22 11 90

Sorted array:
11 12 22 25 34 64 90

Time Complexity: O(n^2)
Space Complexity: O(1)`;
            break;

          case 'mergeSort':
            output = `Input:
12 11 13 5 6 7

Expected Output:
Given array is:
12 11 13 5 6 7

Sorted array is:
5 6 7 11 12 13

Time Complexity: O(n log n)
Space Complexity: O(n)`;
            break;

          case 'selectionSort':
            output = `Input:
64 25 12 22 11 90

Expected Output:
Original array:
64 25 12 22 11 90

Sorted array:
11 12 22 25 64 90

Time Complexity: O(n^2)
Space Complexity: O(1)`;
            break;

          case 'stringMatch':
            output = `Text:
AABAACAADAABAAABAA

Pattern:
AABA

Expected Output:
Pattern found at index 0
Pattern found at index 9
Pattern found at index 13

Time Complexity: O(n × m)
(where n = length of text, m = length of pattern)
Space Complexity: O(1)`;
            break;

          default:
            output = `Program executed successfully!

Time Complexity: O(1)
Space Complexity: O(1)`;
        }

        setSampleOutput(output);
      } catch (error) {
        console.error('Error fetching program content:', error);
        setProgramContent('// Error: Could not load program content');
        setSampleOutput('Error: Could not load sample output');
      } finally {
        setLoading(false);
      }
    };

    fetchProgramContent();
  }, [courseName, programName]);

  const navLinks = courseName
    ? [
        { to: '/', label: 'Home' },
        { to: `/course/${courseName}`, label: courseName },
      ]
    : [{ to: '/', label: 'Home' }];

  return (
    <div className="site-wrapper">
      <Header links={navLinks} />

      <main style={{ paddingTop: '80px' }}>
        <div className="full-program-layout">
          <div className="program-section">
            <h3>Program Code</h3>
            <div className="program-code-full">
              <pre>
                <code>{loading ? 'Loading program...' : programContent}</code>
              </pre>
            </div>
          </div>

          <div className="output-section">
            <h3>Sample Output</h3>
            <p style={{ color: 'red' }}>Please note that the sample output is just an example and it may not be correct since this is AI Generated !!!</p>
            <div className="output-content">
              <pre>
                <code>{loading ? 'Loading sample output...' : sampleOutput}</code>
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgramDetails;
