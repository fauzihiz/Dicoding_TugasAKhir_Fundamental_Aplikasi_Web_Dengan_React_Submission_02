import React from 'react';
import { useLanguage } from '../src/contexts/LanguageContext';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="language-toggle-btn"
      onClick={toggleLanguage}
      title={`Switch to ${language === 'id' ? 'English' : 'Bahasa Indonesia'}`}
    >
      {language === 'id' ? 'EN' : 'ID'}
    </button>
  );
}

export default LanguageToggle;