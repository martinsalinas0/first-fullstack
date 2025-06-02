"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInput = (event) => {
    const input = event.target.value.toLowerCase();
    setQuery(input);
    onSearch(input);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search Contact"
        className="form-control mt-3"
        value={query}
        onChange={handleInput}
      />
    </div>
  );
}