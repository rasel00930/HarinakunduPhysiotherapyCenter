// src/components/SearchBar.jsx
import React from "react";

const SearchBar = ({ searchType, setSearchType, searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="searchType"
            value="name"
            checked={searchType === "name"}
            onChange={(e) => setSearchType(e.target.value)}
          />
          Name
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="searchType"
            value="date"
            checked={searchType === "date"}
            onChange={(e) => setSearchType(e.target.value)}
          />
          Date
        </label>
      </div>

      <input
        type={searchType === "date" ? "date" : "text"}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border px-3 py-2 rounded w-64"
        placeholder={searchType === "name" ? "Enter name..." : "Select date"}
      />

      <button
        onClick={handleSearch}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
