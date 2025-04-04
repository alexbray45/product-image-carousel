import React from "react";
import Card from "react-bootstrap/Card";

function Product({ product, onClick }) {
  return (
    <Card onClick={onClick} style={{ minWidth: "200px", cursor: "pointer" }}>
      <Card.Img
        variant="top"
        src={product.images[0]}
        style={{ height: "150px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
