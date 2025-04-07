import React from "react";
import Card from "react-bootstrap/Card"; // Import Bootstrap's Card component
import "../styles/Product.css"; // Custom styles for the product cards

// Product card component to display a single product summary
// Props:
// - product: object containing name, price, images
// - onClick: function to trigger when card is clicked (e.g., show details modal)
function Product({ product, onClick }) {
  return (
    // Bootstrap card with custom class and inline width
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
