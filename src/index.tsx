import React from 'react';
import ReactDOM from 'react-dom/client';
import HelloWorld from '@components/HelloWorld';
import './styles/index.css';

const App = () => {
  return (
    <div>
      <h1 className="text-red-500">Hello World</h1>
      <HelloWorld />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
