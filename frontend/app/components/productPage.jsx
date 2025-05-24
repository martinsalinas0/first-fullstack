"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./productCard";
import CategoryDropDown from "./categoryDropdown";

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        setProducts(response.data.products);
        console.log(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const [categoryFilter, setCategoryFilter] = useState();
  const [filteredProducts, setfilteredProducts] = useState();

  const onClickForCatFilter = (category) => {
    //on the click of a category, it will set the category
    //set filteredProducts === the set CAT
  };

  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <div className="col-md-3">
          <CategoryDropDown />
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option value="">Sort by Price</option>
            <option value="high-low">Highest to Lowest</option>
            <option value="low-high">Lowest to Highest</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {/* change this from products.map to filteredProducts.map*/}
        {products.map((product, index) => (
          <div className="col-md-4" key={index}>
            <ProductCard
              productName={product.name}
              category={product.category}
              price={product.price}
              imageUrl={"https://picsum.photos/200/200"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
