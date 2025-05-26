// src/components/Search.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const handleChange = (e) => {
    setSearchParams({ keyword: e.target.value });
  };

  return (
    <input
      type="text"
      placeholder="Cari catatan..."
      value={keyword}
      onChange={handleChange}
    />
  );
};

export default Search;