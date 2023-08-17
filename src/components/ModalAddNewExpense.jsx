import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
export const ModalAddNewExpense = () => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name-addform">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Any expense name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category-addform">
              <Form.Label>Category</Form.Label>
              <select name="category" id="category-addform">
                {}
                <option>Add New Category</option>
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
