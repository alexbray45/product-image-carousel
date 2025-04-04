import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddProduct({ onClose, onSubmit }) {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const rearrangeImages = (from, to) => {
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setImages(updated);
  };

  const resetForm = () => {
    setProductName("");
    setDescription("");
    setPrice("");
    setImages([]);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !description || !price || images.length === 0) {
      alert("Please fill all fields and add at least one image.");
      return;
    }

    const product = {
      name: productName,
      description,
      price,
      images: images.map((img) => img.url),
    };

    onSubmit(product);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      resetForm();
    }, 1500);
  };

  return (
    <Modal show onHide={resetForm} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccess ? (
          <div className="alert alert-success text-center">
            Product added successfully!
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
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
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 99.99"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preview / Rearrange / Remove Images</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {images.map((img, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={img.url}
                      alt={`preview-${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      type="button"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                    {index > 0 && (
                      <button
                        className="btn btn-sm btn-secondary position-absolute bottom-0 start-0"
                        type="button"
                        onClick={() => rearrangeImages(index, index - 1)}
                      >
                        ↑
                      </button>
                    )}
                    {index < images.length - 1 && (
                      <button
                        className="btn btn-sm btn-secondary position-absolute bottom-0 end-0"
                        type="button"
                        onClick={() => rearrangeImages(index, index + 1)}
                      >
                        ↓
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Add More Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={resetForm}>
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
