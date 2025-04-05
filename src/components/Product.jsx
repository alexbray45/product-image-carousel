// src/components/Product.jsx
import React from "react";
import Card from "react-bootstrap/Card";
import "../styles/Product.css"; // Custom styles for product cards

function Product({ product, onClick }) {
  return (
    <Card
      className="product-card"
      onClick={onClick}
      style={{ minWidth: "350px" }}
    >
      <div className="image-wrapper">
        <Card.Img
          variant="top"
          src={product.images[0]}
          alt={product.name}
          className="product-image"
        />
      </div>
      <Card.Body className="text-center">
        <Card.Title className="product-name">{product.name}</Card.Title>
        <Card.Text className="product-price">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
