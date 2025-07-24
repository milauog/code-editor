export const updateOutput = (html: string, css: string, js: string) => `
  <html>
    <head><style>${css}</style></head>
    <body>${html}<script>${js}</script></body>
  </html>
`;

export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};