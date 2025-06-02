import React from 'react';
import { useLanguage } from '../src/contexts/LanguageContext';

function Loading({ message }) {
  const { getText } = useLanguage();

  return (
    <div className="loading-container">
      <p className="loading-message">
        {message || getText('loading')}
      </p>
    </div>
  );
}

export default Loading;