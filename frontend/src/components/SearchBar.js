import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term.trim());
  };

  const handleClear = () => {
    setTerm('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search posts by title, content, or author..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      {term && (
        <button type="button" className="btn btn-secondary" onClick={handleClear}>
          Clear
        </button>
      )}
    </form>
  );
}

export default SearchBar;
