import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query || query.trim() === "") {
      alert("Search cannot be empty");
    } else {
      dispatch(filtertedProducts(query));
      setQuery("");
    }
  };
  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="container">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search Product"
          className="form-control"
          value={query}
          onChange={handleInput}
        />
      </div>
    </div>
  );
}
