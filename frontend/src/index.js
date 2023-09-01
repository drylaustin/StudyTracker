import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StudyContextProvider } from './context/StudyContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StudyContextProvider>
      <App />
    </StudyContextProvider>
    
  </React.StrictMode>
);

