import React, { useState } from 'react';
import { EditorProvider, useEditor } from './context/EditorsContext';
import EditorPanel from './components/EditorsPanel';
import OutputPanel from './components/OutputPanel';
import Toolbar from './components/toolbar';
import { updateOutput, downloadFile } from './utils';
import { useAutoSave } from './hooks/useAutoSave';
import './index.css';

type CodeState = { [key in 'html' | 'css' | 'js']: string };
type MaximizeState = { [key in 'html' | 'css' | 'js']: boolean };
type ViewMode = 'option1' | 'option2' | 'option3';

const AppContent: React.FC = () => {
  const [code, setCode] = useState<CodeState>({
    html: '<h1>Hello World</h1>',
    css: 'h1 { color: blue; }',
    js: 'console.log("Hello from JS!");',
  });
  const [output, setOutput] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('option1');
  const [maximized, setMaximized] = useState<MaximizeState>({ html: false, css: false, js: false });
  const { theme, toggleTheme } = useEditor();

  useAutoSave(code);

  const handleCodeChange = (type: 'html' | 'css' | 'js', value: string) =>
    setCode((prev) => ({ ...prev, [type]: value }));
  
  const formatCode = (type: 'html' | 'css' | 'js') =>
    setCode((prev) => ({ ...prev, [type]: prev[type].replace(/\s+/g, ' ').trim() }));
  
  const toggleMaximize = (type: 'html' | 'css' | 'js') =>
    setMaximized((prev) => {
      const newState: MaximizeState = { html: false, css: false, js: false };
      return { ...newState, [type]: !prev[type] };
    });

  const onRun = () => setOutput(updateOutput(code.html, code.css, code.js));
  const onClear = () => { setCode({ html: '', css: '', js: '' }); setOutput(''); };
  const onDownload = () => downloadFile(updateOutput(code.html, code.css, code.js), 'code.html');

  const handleSetViewMode = (mode: string) => {
    if (mode === 'option1' || mode === 'option2' || mode === 'option3') setViewMode(mode);
  };

  return (
    <div className={`h-screen w-screen flex flex-col ${theme === 'dark' ? 'bg-[#1e1e1e] text-white' : 'bg-gray-100 text-black'}`}>
      <Toolbar
        onRun={onRun}
        onClear={onClear}
        onDownload={onDownload}
        viewMode={viewMode}
        setViewMode={handleSetViewMode}
        toggleTheme={toggleTheme}
      />
      <div className={`flex-1 grid gap-4 p-2 ${viewMode === 'option1' ? 'grid-rows-[2fr_1fr]' : 'grid-cols-2'}`}>
        <div className="flex flex-col gap-2 overflow-auto">
          {(['html', 'css', 'js'] as const).map((type) => (
            <EditorPanel
              key={type}
              type={type}
              code={code[type]}
              onChange={(v) => handleCodeChange(type, v)}
              maximized={maximized[type]}
              toggleMaximize={() => toggleMaximize(type)}
              formatCode={() => formatCode(type)}
            />
          ))}
        </div>
        <OutputPanel output={output} />
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <EditorProvider>
    <AppContent />
  </EditorProvider>
);

export default App;
