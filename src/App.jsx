import React, { useState, useRef, useEffect, useCallback } from "react";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductDetailsModal from "./components/ProductDetailsModal";
import { Button, Container } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./styles/App.css";

function App() {
  // State to store all added products
  const [products, setProducts] = useState([]);

  // State to control the visibility of the Add Product modal
  const [showAddModal, setShowAddModal] = useState(false);

  // State to track the selected product for detail view modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Track the currently visible product index in the carousel
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for scrolling and autoplay
  const scrollRef = useRef(null);
  const autoplayRef = useRef(null);

  // Width of a single product card (used for scrolling calculation)
  const cardWidth = 370; // Adjusts based on card size + margin

  // Function to add a new product to the carousel
  const handleAddProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  // Opens product detail modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Close product detail modal
  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  // Scroll the product carousel to a specific index
  const scrollToIndex = useCallback(
    (index) => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: index * cardWidth,
          behavior: "smooth",
        });
      }
      setActiveIndex(index);
    },
    [cardWidth]
  );

  // Navigate to next product
  const handleNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % products.length;
    scrollToIndex(nextIndex);
  }, [activeIndex, products.length, scrollToIndex]);

  // Navigate to previous product
  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + products.length) % products.length;
    scrollToIndex(prevIndex);
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (products.length === 0) return;

    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    // Clear interval on cleanup
    return () => clearInterval(autoplayRef.current);
  }, [handleNext, products.length]);

  return (
    <Container className="py-5 text-center">
      {/* Header */}
      <h1 className="mb-3">Meliotech - Product Image Carousel</h1>
      <p className="mb-4 text-muted">
        Explore a beautiful and dynamic carousel of products, complete with
        animations, responsive layout, and seamless transitions. <br />
        <strong>
          Designed and developed by Alexander Allotey-Bray as a front-end UI
          showcase for the Meliotech IT Solutions Engineer Tech Challenge.
        </strong>
      </p>

      {/* Button to open Add Product modal */}
      <Button variant="success" onClick={() => setShowAddModal(true)}>
        + Add a Product
      </Button>

      {/* Modal for adding new product */}
      {showAddModal && (
        <AddProduct
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProduct}
        />
      )}

      {/* Display carousel only if products are available */}
      {products.length > 0 && (
        <>
          <div className="products-container-wrapper mt-5">
            {products.length >= 3 && (
              <button
                className="carousel-arrow"
                onClick={handlePrev}
                aria-label="Previous"
              >
                <FaArrowLeft />
              </button>
            )}

            {/* Horizontal scrollable product cards */}
            <div
              className="products-container d-flex gap-3"
              ref={scrollRef}
              onMouseEnter={() => clearInterval(autoplayRef.current)} // Pauses autoplay on hover
              onMouseLeave={() => {
                autoplayRef.current = setInterval(() => {
                  handleNext();
                }, 5000);
              }}
            >
              {products.map((product, index) => (
                <Product
                  key={index}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>

            {/* Right arrow button (only shows if there are 3 or more products) */}
            {products.length >= 3 && (
              <button
                className="carousel-arrow"
                onClick={handleNext}
                aria-label="Next"
              >
                <FaArrowRight />
              </button>
            )}
          </div>

          {/* Navigation dots below carousel */}
          <div className="dots-wrapper mt-3">
            {products.map((_, index) => (
              <span
                key={index}
                className={`dot ${activeIndex === index ? "active-dot" : ""}`}
                onClick={() => scrollToIndex(index)}
              ></span>
            ))}
          </div>
        </>
      )}
      {/* Modal for viewing product details */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={handleCloseDetails}
        />
      )}
    </Container>
  );
}

export default App;
