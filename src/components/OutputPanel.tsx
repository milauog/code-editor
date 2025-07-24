import React from 'react';
import { useEditor } from '../context/EditorsContext';

interface OutputPanelProps {
  output: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output }) => {
  const { theme } = useEditor();

  return (
  <div className="border rounded shadow-md flex flex-col h-full">
  <h3 className="bg-gray-800 text-white p-2 border-b">Output</h3>
  <iframe
    title="output"
    srcDoc={output}
    className="flex-1 w-full border-0"
    style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5' }}
  />
</div>

  );
};

export default OutputPanel;