import React, { useState, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useEditor } from '../context/EditorsContext';

interface EditorPanelProps {
  type: 'html' | 'css' | 'js';
  code: string;
  onChange: (value: string) => void;
  maximized: boolean;
  toggleMaximize: () => void;
  formatCode: () => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ type, code, onChange, maximized, toggleMaximize, formatCode }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useEditor();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const extension = type === 'html' ? html() : type === 'css' ? css() : javascript();
  const editorTheme = theme === 'dark' ? oneDark : 'light';

  return (
<div className={`flex flex-col flex-1 border ${maximized ? 'flex-[3]' : ''} transition-all duration-300`}>
  <div className="flex justify-between items-center bg-gray-800 p-2 border-b">
        <h3 className="text-white font-semibold">{type.toUpperCase()}</h3>
        <div className="relative" ref={ref}>
          <button
            onClick={() => setDropdown(!dropdown)}
            className="text-white hover:text-gray-300"
          >
            ⚙️
          </button>
          {dropdown && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded p-2 z-10">
              <button onClick={formatCode} className="block w-full text-left hover:bg-gray-100 p-1">
                Format {type.toUpperCase()}
              </button>
              <button className="block w-full text-left hover:bg-gray-100 p-1">Analyze</button>
              <button
                onClick={toggleMaximize}
                className="block w-full text-left hover:bg-gray-100 p-1"
              >
                {maximized ? 'Minimize' : 'Maximize'}
              </button>
              <button className="block w-full text-left hover:bg-gray-100 p-1">Fold All</button>
              <button className="block w-full text-left hover:bg-gray-100 p-1">Unfold All</button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1">
    <CodeMirror
      value={code}
      height="100%"
      className="h-full"
      extensions={[extension]}
      theme={editorTheme}
      onChange={onChange}
    />
  </div>
    </div>
  );
};

export default EditorPanel;