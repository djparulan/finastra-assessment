import React, { useState } from "react";
import fuzzySearch from "../../utils/fuzzySearch";

const FuzzySearch = ({ data }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setResults(fuzzySearch(e.target.value, data));
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search..."
      />
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FuzzySearch;