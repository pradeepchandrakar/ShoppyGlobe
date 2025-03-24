// src/components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleSearch}
        className="border rounded-lg p-2 w-80 shadow-md"
      />
    </div>
  );
};

export default SearchBar;
