import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  //button for search or should we use autofilter while typing?
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
    <div className="row m-4">
      <div className="input-group col">
        <input
          type="text"
          placeholder="Search Product"
          className="form-control"
          value={query}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row col-md-2">
      <button className="btn btn-primary">Button</button>
      </div>
    </div>
  );
}
