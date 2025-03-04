import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, InputGroup } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";

const ServiceSelectionModal = ({
  show,
  onHide,
  allServices,
  selectedServices,
  setSelectedServices,
  onConfirm,
}) => {
  const handleQuantityChange = (index, newQuantity) => {
    const updatedServices = [...selectedServices];
    updatedServices[index].quantity = Math.max(1, newQuantity);
    setSelectedServices(updatedServices);
  };

  const handleAddService = (serviceId) => {
    if (!serviceId) return;

    const serviceToAdd = allServices.find((s) => s._id === serviceId);
    if (serviceToAdd) {
      const existingIndex = selectedServices.findIndex(
        (s) => s._id === serviceToAdd._id
      );

      if (existingIndex !== -1) {
        const updatedServices = [...selectedServices];
        updatedServices[existingIndex].quantity += 1;
        setSelectedServices(updatedServices);
      } else {
        const newServices = [
          ...selectedServices,
          { ...serviceToAdd, quantity: 1 },
        ];
        setSelectedServices(newServices);
      }
    }
  };

  const handleRemoveService = (index) => {
    const updatedServices = selectedServices.filter((_, i) => i !== index);
    setSelectedServices(updatedServices);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chọn Dịch Vụ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tên Dịch Vụ</th>
              <th>Đơn Giá</th>
              <th>Số Lượng</th>
              <th>Thành Tiền</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {selectedServices.map((service, index) => (
              <tr key={index}>
                <td>{service.name}</td>
                <td>{service.price.toLocaleString()}đ</td>
                <td>
                  <InputGroup size="sm" style={{ width: "100px" }}>
                    <Button
                      variant="outline-secondary"
                      onClick={() =>
                        handleQuantityChange(index, service.quantity - 1)
                      }
                    >
                      <FaMinus />
                    </Button>
                    <Form.Control
                      type="number"
                      min="1"
                      value={service.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() =>
                        handleQuantityChange(index, service.quantity + 1)
                      }
                    >
                      <FaPlus />
                    </Button>
                  </InputGroup>
                </td>
                <td>{(service.price * service.quantity).toLocaleString()}đ</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveService(index)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Form.Group className="mt-3">
          <Form.Label>Thêm Dịch Vụ:</Form.Label>
          <Form.Select onChange={(e) => handleAddService(e.target.value)}>
            <option value="">Chọn dịch vụ...</option>
            {allServices.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name} - {service.price.toLocaleString()}đ
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Xác Nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceSelectionModal;