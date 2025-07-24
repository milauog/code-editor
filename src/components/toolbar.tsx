import React from 'react';
import { FaPlay, FaTrash, FaDownload, FaMoon, FaSun } from 'react-icons/fa';
import { useEditor } from '../context/EditorsContext';

interface ToolbarProps {
  onRun: () => void;
  onClear: () => void;
  onDownload: () => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  toggleTheme: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onRun, onClear, onDownload, viewMode, setViewMode, toggleTheme }) => {
  const { theme } = useEditor(); // Now imported

  return (
    <div className="bg-gray-900 p-2 flex justify-between items-center shadow-md">
  <div className="flex items-center space-x-3">
    <span className="text-lg font-bold text-blue-400">CodeEditor</span>
    <button
      onClick={onRun}
      className="flex items-center bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
      title="Run Code (Ctrl+R)"
    >
      <FaPlay className="mr-1" /> Run
    </button>
  </div>
  <div className="flex items-center space-x-2">
    <button onClick={onClear} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
      <FaTrash />
    </button>
    <button onClick={onDownload} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
      <FaDownload />
    </button>
    <select value={viewMode} onChange={(e) => setViewMode(e.target.value)} className="bg-gray-700 text-white px-2 py-1 rounded">
      <option value="option1">Output: Bottom</option>
      <option value="option2">Output: Right</option>
      <option value="option3">Output: Left</option>
    </select>
    <button onClick={toggleTheme} className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition">
      {theme === 'dark' ? <FaMoon /> : <FaSun />}
    </button>
  </div>
</div>

  );
};

export default Toolbar;