import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryDropDown() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
<div className="container">
  <select className="form-select">
    <option value="">Select a category</option>
    {products.map((product, index) => (
      <option key={index} value={product.category}>
        {product.category}
      </option>
    ))}
  </select>
</div>
  );
}
