import React, { useState } from "react";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductDetailsModal from "./components/ProductDetailsModal";
import { Button, Container } from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <Container className="py-5 text-center">
      <h1 className="mb-4">Welcome to the Product Carousel</h1>
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
        <div className="d-flex overflow-auto mt-5 gap-3">
          {products.map((product, index) => (
            <Product
              key={index}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
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
