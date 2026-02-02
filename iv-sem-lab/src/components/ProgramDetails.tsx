import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const ProgramDetails: React.FC = () => {
  const { courseName, programName } = useParams<{ courseName: string; programName: string }>();
  const [programContent, setProgramContent] = useState<string>('');
  const [sampleOutput, setSampleOutput] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch program content from the public/data folder
    const fetchProgramContent = async () => {
      try {
        // Check if courseName and programName exist
        if (!courseName || !programName) {
          setProgramContent('// Error: Course or program name not provided');
          setSampleOutput('#include <stdio.h>\n\nint main() {\n    printf("Sample output:\\n");\n    printf("Program executed successfully!\\n");\n    return 0;\n}');
          setLoading(false);
          return;
        }

        // Map programName to actual filename
        let fileName = '';
        if (programName === 'bubbleSort') fileName = 'bubbleSort.txt';
        else if (programName === 'mergeSort') fileName = 'mergeSort.txt';
        else if (programName === 'selectionSort') fileName = 'selectionSort.txt';
        else if (programName === 'stringMatch') fileName = 'stringMatch.txt';
        else {
          setProgramContent('// Program file not found');
          setSampleOutput('#include <stdio.h>\n\nint main() {\n    printf("Sample output:\\n");\n    printf("Program executed successfully!\\n");\n    return 0;\n}');
          setLoading(false);
          return;
        }

        // Fetch the content from the public/data folder
        const response = await fetch(`/data/${courseName.toLowerCase()}/${fileName}`);
        if (response.ok) {
          const content = await response.text();
          setProgramContent(content);
        } else {
          setProgramContent('// Error: Could not load program content');
        }

        // Set sample output based on program type
        let output = '';
        if (programName === 'bubbleSort') {
          output = `Input: 64 34 25 12 22 11 90
Expected Output:
Original array: 64 34 25 12 22 11 90
Sorted array: 11 22 25 34 64 90 11 90

Time Complexity: O(n^2)
Space Complexity: O(1)`;
        } else if (programName === 'mergeSort') {
          output = `Input: 12 11 13 5 6 7
Expected Output:
Given array is
12 11 13 5 6 7
Sorted array is
5 6 7 11 12 13

Time Complexity: O(n log n)
Space Complexity: O(n)`;
        } else if (programName === 'selectionSort') {
          output = `Input: 64 25 12 22 11 90
Expected Output:
Original array: 64 25 12 22 11 90
Sorted array: 11 12 22 25 64 90

Time Complexity: O(n^2)
Space Complexity: O(1)`;
        } else if (programName === 'stringMatch') {
          output = `Text: AABAACAADAABAAABAA
Pattern: AABA
Expected Output:
Pattern found at index 0
Pattern found at index 9
Pattern found at index 13

Time Complexity: O(n*m) where n is length of text and m is length of pattern
Space Complexity: O(1)`;
        } else {
          output = `Sample Output for ${programName || 'Program'}:
Program executed successfully!

Time Complexity: O(1)
Space Complexity: O(1)

Additional Notes:
- This is a sample output for demonstration purposes
- Actual output may vary depending on the input`;
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

  const navLinks =
    courseName
      ? [
          { to: '/', label: 'Home' },
          { to: `/course/${courseName}`, label: courseName },
        ]
      : [{ to: '/', label: 'Home' }];

  return (
    <div className="site-wrapper">
      <Header links={navLinks} />

      <main style={{paddingTop: '80px'}}>
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