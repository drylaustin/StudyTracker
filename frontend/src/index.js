import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StudyContextProvider } from './context/StudyContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <StudyContextProvider>
      <App />
    </StudyContextProvider>
  </AuthContextProvider>
  </React.StrictMode>
);

