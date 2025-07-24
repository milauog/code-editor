import { useEffect } from 'react';

export const useAutoSave = (code: { html: string; css: string; js: string }, delay = 1000) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('code-editor-state', JSON.stringify(code));
    }, delay);
    return () => clearTimeout(timer);
  }, [code, delay]);
};