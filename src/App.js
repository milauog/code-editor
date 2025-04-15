import React, { useState, useRef, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { githubLight } from '@uiw/codemirror-theme-github';
import './App.css';

function App() {
  // Code states
  const [htmlCode, setHtmlCode] = useState('<h1>Hello World</h1>\n<p>Edit me!</p>');
  const [cssCode, setCssCode] = useState('h1 { color: blue; }\np { font-size: 18px; }');
  const [jsCode, setJsCode] = useState('// JavaScript goes here\nconsole.log("Hello from JS!");');
  const [output, setOutput] = useState('');

  // View mode state
  const [viewMode, setViewMode] = useState('option2');

  // Panel maximize/minimize states
  const [htmlMaximized, setHtmlMaximized] = useState(false);
  const [cssMaximized, setCssMaximized] = useState(false);
  const [jsMaximized, setJsMaximized] = useState(false);

  // Dropdown visibility states
  const [htmlDropdown, setHtmlDropdown] = useState(false);
  const [cssDropdown, setCssDropdown] = useState(false);
  const [jsDropdown, setJsDropdown] = useState(false);

  // Theme state
  const [darkMode, setDarkMode] = useState(true);

  // Auto-run state
  const [autoRun, setAutoRun] = useState(false);

  // Font size state
  const [fontSize, setFontSize] = useState(14);

  // Refs for dropdowns
  const htmlRef = useRef(null);
  const cssRef = useRef(null);
  const jsRef = useRef(null);

  // Update output function
  const updateOutput = React.useCallback(() => {
    const outputHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    setOutput(outputHtml);
  }, [htmlCode, cssCode, jsCode]);

  // Auto-run effect
  useEffect(() => {
    if (autoRun) {
      const timer = setTimeout(updateOutput, 500);
      return () => clearTimeout(timer);
    }
  }, [htmlCode, cssCode, jsCode, autoRun, updateOutput]);

  // Clear editors function
  const clearEditors = () => {
    if (window.confirm('Are you sure you want to clear all editors?')) {
      setHtmlCode('');
      setCssCode('');
      setJsCode('');
      setOutput('');
    }
  };

  // Download code function
  const downloadCode = () => {
    const fullCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-project.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Format code
  const formatCode = (type) => {
    try {
      if (type === 'html') {
        // Basic HTML formatting
        let formatted = htmlCode
          .replace(/></g, '>\n<')
          .replace(/\s+/g, ' ')
          .replace(/>\s+</g, '>\n<');
        setHtmlCode(formatted.trim());
      } else if (type === 'css') {
        // Basic CSS formatting
        let formatted = cssCode
          .replace(/\{/g, ' {\n  ')
          .replace(/\}/g, '\n}\n')
          .replace(/;/g, ';\n  ')
          .replace(/\s+/g, ' ')
          .trim();
        setCssCode(formatted);
      } else if (type === 'js') {
        // Basic JS formatting
        let formatted = jsCode
          .replace(/\{/g, ' {\n  ')
          .replace(/\}/g, '\n}\n')
          .replace(/;/g, ';\n')
          .replace(/\s+/g, ' ')
          .trim();
        setJsCode(formatted);
      }
    } catch (e) {
      console.error('Formatting error:', e);
    }
  };

  // Toggle panel maximize
  const toggleMaximize = (type) => {
    switch (type) {
      case 'html':
        setHtmlMaximized(!htmlMaximized);
        setCssMaximized(false);
        setJsMaximized(false);
        break;
      case 'css':
        setCssMaximized(!cssMaximized);
        setHtmlMaximized(false);
        setJsMaximized(false);
        break;
      case 'js':
        setJsMaximized(!jsMaximized);
        setHtmlMaximized(false);
        setCssMaximized(false);
        break;
      default:
        break;
    }
  };

  // Toggle dropdown
  const toggleDropdown = (type) => {
    switch (type) {
      case 'html':
        setHtmlDropdown(!htmlDropdown);
        setCssDropdown(false);
        setJsDropdown(false);
        break;
      case 'css':
        setCssDropdown(!cssDropdown);
        setHtmlDropdown(false);
        setJsDropdown(false);
        break;
      case 'js':
        setJsDropdown(!jsDropdown);
        setHtmlDropdown(false);
        setCssDropdown(false);
        break;
      default:
        break;
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (htmlRef.current && !htmlRef.current.contains(event.target)) {
        setHtmlDropdown(false);
      }
      if (cssRef.current && !cssRef.current.contains(event.target)) {
        setCssDropdown(false);
      }
      if (jsRef.current && !jsRef.current.contains(event.target)) {
        setJsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Current theme
  const currentTheme = darkMode ? oneDark : githubLight;
  const appTheme = darkMode ? 'dark' : 'light';


  return (
    <div className={`editor-container ${viewMode} ${appTheme}`}>
     

      <div className="toolbar">
        <div className="toolbar-group">
          <button onClick={updateOutput} className="run-button">
            ▶️ Run
          </button>
          <button onClick={clearEditors} className="clear-button">
            🗑️ Clear
          </button>
          <button onClick={downloadCode} className="download-button">
            ⬇️ Download
          </button>
        </div>

        <div className="toolbar-group">
          <button onClick={toggleTheme} className="theme-button">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <label className="auto-run-toggle">
            <input
              type="checkbox"
              checked={autoRun}
              onChange={() => setAutoRun(!autoRun)}
            />
            <span>Auto-run</span>
          </label>
        </div>

        <div className="toolbar-group">
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="font-size-selector"
          >
            <option value={12}>Small</option>
            <option value={14}>Medium</option>
            <option value={16}>Large</option>
            <option value={18}>X-Large</option>
          </select>

          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="layout-selector"
          >
            <option value="option1">Output Bottom</option>
            <option value="option2">Output Right</option>
            <option value="option3">Output Left</option>
          </select>
        </div>
      </div>

      <div className="main-layout">
        <div className="code-panels">
          {/* HTML Editor */}
          <div className={`code-panel html-panel ${htmlMaximized ? 'maximized' : ''}`}>
            <div className="panel-header">
              <h3>HTML</h3>
              <div className="dropdown" ref={htmlRef}>
                <button
                  className="settings-button"
                  onClick={() => toggleDropdown('html')}
                >
                  ⚙️ 
                </button>
                {htmlDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={() => formatCode('html')}>Format Code</button>
                    <button onClick={() => toggleMaximize('html')}>
                      {htmlMaximized ? 'Restore Size' : 'Maximize'}
                    </button>
                   
                  </div>
                )}
              </div>
            </div>
            <CodeMirror
              value={htmlCode}
              height="100%"
              extensions={[html()]}
              theme={currentTheme}
              onChange={setHtmlCode}
              style={{ fontSize: `${fontSize}px` }}
            />
          </div>

          {/* CSS Editor */}
          <div className={`code-panel css-panel ${cssMaximized ? 'maximized' : ''}`}>
            <div className="panel-header">
              <h3>CSS</h3>
              <div className="dropdown" ref={cssRef}>
                <button
                  className="settings-button"
                  onClick={() => toggleDropdown('css')}
                >
                  ⚙️ 
                </button>
                {cssDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={() => formatCode('css')}>Format Code</button>
                    <button onClick={() => toggleMaximize('css')}>
                      {cssMaximized ? 'Restore Size' : 'Maximize'}
                    </button>
                    
                  </div>
                )}
              </div>
            </div>
            <CodeMirror
              value={cssCode}
              height="100%"
              extensions={[css()]}
              theme={currentTheme}
              onChange={setCssCode}
              style={{ fontSize: `${fontSize}px` }}
            />
          </div>

          {/* JavaScript Editor */}
          <div className={`code-panel js-panel ${jsMaximized ? 'maximized' : ''}`}>
            <div className="panel-header">
              <h3>JavaScript</h3>
              <div className="dropdown" ref={jsRef}>
                <button
                  className="settings-button"
                  onClick={() => toggleDropdown('js')}
                >
                  ⚙️ 
                </button>
                {jsDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={() => formatCode('js')}>Format Code</button>
                    <button onClick={() => toggleMaximize('js')}>
                      {jsMaximized ? 'Restore Size' : 'Maximize'}
                    </button>
                    
                  </div>
                )}
              </div>
            </div>
            <CodeMirror
              value={jsCode}
              height="100%"
              extensions={[javascript()]}
              theme={currentTheme}
              onChange={setJsCode}
              style={{ fontSize: `${fontSize}px` }}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="output-panel">
          <div className="panel-header">
            <h3>Output Preview</h3>
            <button onClick={updateOutput} className="refresh-button">
              🔄 Refresh
            </button>
          </div>
          <iframe
            title="output"
            srcDoc={output}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>

      <footer className="app-footer">
  <div className="footer-content">
    <div className="footer-tech">
      <span>Built with</span>
      <div className="tech-icons">
        <span className="react-icon">⚛️</span>
        <span className="codemirror-icon">📝</span>
      </div>
    </div>
    <div className="footer-copyright">
      © {new Date().getFullYear()} <span className="signature-name">Millyon Tilahun</span>
    </div>
    <div className="footer-links">
      <a href="https://github.com/milauog" target="_blank" rel="noopener noreferrer">
        <FaGithub className="github-icon" /> 
      </a>
      <a href="https://www.linkedin.com/in/millyon-tilahun/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="linkedin-icon" /> 
      </a>
    </div>
  </div>
</footer>
    </div>
  );
}

export default App;