import './preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  bundelingStatus: string;
}

const html = `
    <html lang='en'>
      <head>
        <title>Prieview</title>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id='root'></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4>' + err + '</div>';
            console.error(err);
          };
          
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });
          
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, bundelingStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe title="preview" ref={iframe} srcDoc={html} sandbox="allow-scripts" />
      {bundelingStatus && <div className="preview-error">{bundelingStatus}</div>}
    </div>
  );
};

export default Preview;
