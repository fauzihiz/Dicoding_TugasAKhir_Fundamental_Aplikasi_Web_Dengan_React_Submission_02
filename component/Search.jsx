import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../src/contexts/LanguageContext';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getText } = useLanguage();
  
  const keyword = searchParams.get('keyword') || '';

  const handleChange = (e) => {
    const value = e.target.value;
    
    if (value.trim()) {
      setSearchParams({ keyword: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={getText('searchPlaceholder')}
        value={keyword}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;