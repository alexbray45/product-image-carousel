import React from "react";
import { Modal, Carousel } from "react-bootstrap";

function ProductDetailsModal({ product, onClose }) {
  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel>
          {product.images.map((url, idx) => (
            <Carousel.Item key={idx}>
              <img
                src={url}
                alt={`Slide ${idx}`}
                className="d-block w-100"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <hr />
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default ProductDetailsModal;
