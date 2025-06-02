"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./productCard";
import CategoryDropDown from "./categoryDropdown";
import SearchBar from "./searchBar";

export default function ProductPage() {
  //STATES
  //sets the produts for the API request
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCatFitler, setSelectedCatFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories ] = useState([])

  //makes the API request
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        // console.log(products);
        const uniqueCategories = [...new Set(productsData.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCatFitler) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOrder === "high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCatFitler, sortOrder, products]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCatChange = (category) => {
    setSelectedCatFilter(category);
  };

  const handlePriceSort = (event) => {
    setPriceSort(event.target.value);
  };

  return (
    <div className="container my-5">
      <div className="row m-4">
        <div className="col-md-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary"
            onClick={() => handleSearch(searchQuery)}
          >
            Search
          </button>
        </div>

        <div className="col-md-4">
          <CategoryDropDown 
          categories={categories} 
          onCategoryChange={handleCatChange} />
        </div>

        <div className="col-md-3 m-4">
          <select
            className="form-select"
            value={sortOrder}
            onChange={handlePriceSort}
          >
            <option value="">Sort by Price</option>
            <option value="high-low">Highest to Lowest</option>
            <option value="low-high">Lowest to Highest</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {filteredProducts.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">No products found.</p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            <div className="col-md-4" key={product.id || index}>
              <ProductCard
                productName={product.name}
                category={product.category}
                price={product.price}
                imageUrl={product.imageUrl || "https://picsum.photos/200/200"}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
