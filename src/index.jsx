import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext'; 
import { ThemeProvider } from './contexts/ThemeContext';     

import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>    
      <LanguageProvider> 
        <AuthProvider>     
          <App />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
);