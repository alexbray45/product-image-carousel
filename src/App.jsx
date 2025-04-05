import React, { useState, useRef, useEffect } from "react";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductDetailsModal from "./components/ProductDetailsModal";
import { Button, Container } from "react-bootstrap";
import "./styles/App.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function App() {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const scrollRef = useRef(null);
  const autoplayRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = 250; // match your actual card width

  // 👈 Arrow scroll handlers
  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % products.length;
    scrollRef.current.scrollTo({
      left: nextIndex * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + products.length) % products.length;
    scrollRef.current.scrollTo({
      left: prevIndex * (cardWidth / 2),
      behavior: "smooth",
    });
    setActiveIndex(prevIndex);
  };

  const handleAddProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  // 🔁 Autoplay scroll every 5s
  useEffect(() => {
    if (!scrollRef.current || products.length === 0) return;

    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        const nextIndex = (activeIndex + 1) % products.length;
        scrollRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: "smooth",
        });
        setActiveIndex(nextIndex);
      }, 5000);
    };

    startAutoplay();

    return () => clearInterval(autoplayRef.current);
  }, [activeIndex, products.length]);

  // ⏸️ Pause on hover, resume on leave
  const handleMouseEnter = () => {
    clearInterval(autoplayRef.current);
  };

  const handleMouseLeave = () => {
    autoplayRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % products.length;
      scrollRef.current.scrollTo({
        left: nextIndex * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(nextIndex);
    }, 5000);
  };

  return (
    <Container className="py-5 text-center">
      <h1 className="mb-4">Meliotech - Product Image Carousel</h1>
      <p className="mb-4 text-muted">
        This carousel UI component allows users to seamlessly browse products
        with autoplay functionality, responsive layout, and intuitive
        navigation. Designed with attention to detail, it delivers a smooth user
        experience through elegant animations and interactive features. <br />
        <strong>
          Designed & developed by Alexander Allotey-Bray for the Meliotech IT
          Solutions Engineer Tech Challenge.
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
        <div className="products-container-wrapper mt-5">
          <button
            className="carousel-arrow"
            onClick={handlePrev}
            aria-label="Scroll Left"
          >
            <FaArrowLeft />
          </button>

          <div
            className="d-flex gap-3 overflow-auto mt-5 products-container"
            ref={scrollRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {products.map((product, index) => (
              <Product
                key={index}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>

          <button
            className="carousel-arrow"
            onClick={handleNext}
            aria-label="Scroll Right"
          >
            <FaArrowRight />
          </button>
        </div>
      )}

      {/* Dots Navigation */}
      <div className="dots-wrapper mt-3">
        {products.map((_, index) => (
          <span
            key={index}
            className={`dot ${activeIndex === index ? "active-dot" : ""}`}
            onClick={() => {
              scrollRef.current.scrollTo({
                left: index * cardWidth,
                behavior: "smooth",
              });
              setActiveIndex(index);
            }}
          ></span>
        ))}
      </div>

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
