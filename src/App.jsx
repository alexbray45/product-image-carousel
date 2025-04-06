import React, { useState, useRef, useEffect, useCallback } from "react";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductDetailsModal from "./components/ProductDetailsModal";
import { Button, Container } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./styles/App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);
  const autoplayRef = useRef(null);

  const cardWidth = 370; // Adjust based on your card size + margin

  const handleAddProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

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

  const handleNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % products.length;
    scrollToIndex(nextIndex);
  }, [activeIndex, products.length, scrollToIndex]);

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

    return () => clearInterval(autoplayRef.current);
  }, [handleNext, products.length]);

  return (
    <Container className="py-5 text-center">
      <h1 className="mb-3">Meliotech - Product Image Carousel</h1>
      <p className="mb-4 text-muted">
        Explore a beautiful and dynamic carousel of products, complete with
        animations, responsive layout, and seamless transitions. <br />
        <strong>
          Designed and developed by Alexander Allotey-Bray as a front-end UI
          showcase for the Meliotech IT Solutions Engineer Tech Challenge.
        </strong>
      </p>

      <Button variant="success" onClick={() => setShowAddModal(true)}>
        + Add a Product
      </Button>

      {showAddModal && (
        <AddProduct
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProduct}
        />
      )}

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

            <div
              className="products-container d-flex gap-3"
              ref={scrollRef}
              onMouseEnter={() => clearInterval(autoplayRef.current)}
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
