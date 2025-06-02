"use client";
import ProductCard from "@/components/ProductCard.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { fetchProducts, setPage } from "../store/slices/productSlice.js";

export default function ProductsList() {
  const dispatch = useDispatch();
  const {
    products,
    categories,
    isLoading,
    error,
    count,
    page,
    totalPages,
  } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceSort, setPriceSort] = useState(null);

  // Fetch products when category, sort, or page changes
  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, priceSort, page }));
  }, [dispatch, selectedCategory, priceSort, page]);

  // Filter products client-side by search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchQuery]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    dispatch(setPage(1));
  };

  const handleSortSelect = (sort) => {
    setPriceSort(sort);
    dispatch(setPage(1));
  };

  const handleSearchInput = (text) => {
    setSearchQuery(text);
    dispatch(setPage(1));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceSort(null);
    dispatch(setPage(1));
    dispatch(fetchProducts({ page: 1 }));
  };

  const prevPage = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const nextPage = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  return (
    <div className="container">
      <Navbar
        className="bg-body-tertiary justify-content-between"
        style={{ minHeight: "90px" }}
      >
        <Form className="m-2">
          <InputGroup>
            <InputGroup.Text>Search for Products</InputGroup.Text>
            <FormControl
              placeholder="Search"
              style={{ minWidth: "500px" }}
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
            />
          </InputGroup>
        </Form>

        <Form className="me-5">
          <Row>
            <Col xs="auto">
              <NavDropdown title="Sort by Price" id="dropdown-price">
                <NavDropdown.Item onClick={() => handleSortSelect("highest")}>
                  Highest
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleSortSelect("lowest")}>
                  Lowest
                </NavDropdown.Item>
              </NavDropdown>
            </Col>

            <Col xs="auto">
              <NavDropdown title="Category" id="dropdown-category">
                <NavDropdown.Item
                  onClick={() => handleCategorySelect(null)}
                  active={selectedCategory === null}
                >
                  All
                </NavDropdown.Item>
                {categories.map((cat, idx) => (
                  <NavDropdown.Item
                    key={idx}
                    onClick={() => handleCategorySelect(cat)}
                    active={selectedCategory === cat}
                  >
                    {cat}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Col>

            <Col xs="auto">
              <Button type="button" className="btn-sm">
                Create New Product
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                type="button"
                className="btn btn-sm btn-success"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Form>
      </Navbar>

      <div className="row g-4 mt-4">
        {isLoading ? (
          <div className="col-12 text-center">
            <p className="text-muted">Loading products...</p>
          </div>
        ) : error ? (
          <div className="col-12 text-center text-danger">
            <p>{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">No products found.</p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            <div
              className="col-12 col-sm-6 col-md-4"
              key={product._id ?? index}
            >
              <ProductCard
                name={product.name}
                category={product.category}
                price={product.price}
                imageUrl={product.image || "https://picsum.photos/200/300"}
              />
            </div>
          ))
        )}
      </div>

      <div className="d-flex justify-content-center my-4 gap-3">
        <Button
          onClick={prevPage}
          disabled={page <= 1}
          variant="secondary"
          size="sm"
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <Button
          onClick={nextPage}
          disabled={page >= (totalPages || 1)}
          variant="secondary"
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
