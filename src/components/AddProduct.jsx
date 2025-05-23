import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles/AddProduct.css"; // Custom CSS for modal styling

/**
 * AddProduct Component
 * Modal form that allows users to add a new product with name, description, price, and images.
 * Includes image preview, rearranging, and removal before submitting.
 */
function AddProduct({ onClose, onSubmit }) {
  // State variables for form fields
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // Success message visibility

  /**
   * Handle image uploads and generate preview URLs
   */

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...files]);
  };

  /**
   * Remove a selected image by index
   */
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Rearrange images in the array to reorder previews
   */
  const rearrangeImages = (from, to) => {
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setImages(updated);
  };

  /**
   * Reset form fields and close the modal
   */
  const resetForm = () => {
    setProductName("");
    setDescription("");
    setPrice("");
    setImages([]);
    onClose(); // Trigger parent close modal
  };

  /**
   * Handle form submission
   * Validate fields, construct product object, submit, and show success
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation check
    if (!productName || !description || !price || images.length === 0) {
      alert("Please fill all fields and add at least one image.");
      return;
    }

    // Construct product object with relevant data
    const product = {
      name: productName,
      description,
      price,
      images: images.map((img) => img.url),
    };

    onSubmit(product); // Pass to parent handler
    setShowSuccess(true); // To show success message

    // Hide success and reset form after a delay
    setTimeout(() => {
      setShowSuccess(false);
      resetForm();
    }, 4000);
  };

  return (
    <Modal show onHide={resetForm} size="lg" centered className="fade-in-modal">
      {/* Modal Header */}
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title-custom">Add a Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccess ? (
          <div className="alert alert-success text-center">
            Product added successfully!
          </div>
        ) : (
          <Form onSubmit={handleSubmit} className="add-product-form">
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short product description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (USD)</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => {
                  const newValue = e.target.value;

                  // Allow empty string (clear the field) or valid positive numbers with decimals
                  if (newValue === "" || /^[+]?\d*\.?\d+$/.test(newValue)) {
                    setPrice(newValue); // Set the value directly
                  }
                }}
                placeholder="$ 99.99"
                required
                min="0"
                step="0.01" // Allow decimal points up to two places
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Add Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> (Preview / Rearrange / Remove Images)</Form.Label>
              <div className="d-flex flex-wrap gap-3 image-preview-wrapper">
                {images.map((img, index) => (
                  <div key={index} className="preview-box">
                    <img
                      src={img.url}
                      alt={`preview-${index}`}
                      className="preview-img"
                    />
                    <button
                      className="btn btn-sm btn-danger remove-btn"
                      type="button"
                      onClick={() => removeImage(index)}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                    {index > 0 && (
                      <button
                        className="btn btn-sm btn-secondary move-btn move-up"
                        type="button"
                        onClick={() => rearrangeImages(index, index - 1)}
                        aria-label="Move image up"
                      >
                        ↑
                      </button>
                    )}
                    {index < images.length - 1 && (
                      <button
                        className="btn btn-sm btn-secondary move-btn move-down"
                        type="button"
                        onClick={() => rearrangeImages(index, index + 1)}
                        aria-label="Move image down"
                      >
                        ↓
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="outline-secondary" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={
                  !productName || !description || !price || !images.length
                }
              >
                Submit Product
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AddProduct;
