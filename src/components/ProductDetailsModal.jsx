import React from "react";
import { Modal, Carousel } from "react-bootstrap";
import "../styles/ProductDetailsModal.css"; // Import custom styles for this modal

// Component to display detailed information about a product inside a modal
function ProductDetailsModal({ product, onClose }) {
  // Determine whether to show carousel controls (only if more than one image)

  const multipleImages = product.images.length > 1;

  return (
    // Bootstrap modal: show modal with close functionality

    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="carousel-wrapper">
          <Carousel
            controls={multipleImages}
            indicators={multipleImages}
            interval={3000}
            fade
          >
            {product.images.map((url, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={url}
                  alt={`Product ${product.name} - Slide ${idx + 1}`}
                  className="product-carousel-image"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="product-info mt-4">
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProductDetailsModal;
