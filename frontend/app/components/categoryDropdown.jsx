export default function CategoryDropDown({ categories, onCategoryChange }) {
  const handleChange = (e) => {
    onCategoryChange(e.target.value);
  };

  return (
    <select className="form-select" onChange={handleChange} defaultValue="">
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
