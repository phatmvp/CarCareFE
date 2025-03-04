import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Table, Badge, Spinner } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaExchangeAlt } from 'react-icons/fa';
import { fetchSchedule, updateScheduleSlot } from "../../apis";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SchedulePage.css";

const SchedulePage = () => {
  const [schedule, setSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const garageId = "65a4c1e2f4d2b41234abcd10"; // Thay bằng garageId thực tế

  useEffect(() => {
    if (selectedDate) {
      loadSchedule();
    }
  }, [selectedDate]);

  const loadSchedule = async () => {
    setLoading(true);
    try {
      const data = await fetchSchedule(garageId, selectedDate);
      setSchedule(data);
    } catch (error) {
      console.error("Lỗi khi lấy lịch đặt chỗ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSlot = async (slot) => {
    setLoading(true);
    const newStatus = slot.status === "Available" ? "Booked" : "Available";
    const data = {
      date: selectedDate,
      slot: slot.slot,
      status: newStatus,
      bookingId: newStatus === "Booked" ? "sample-booking-id" : null,
    };
    try {
      await updateScheduleSlot(garageId, data);
      loadSchedule();
    } catch (error) {
      console.error("Lỗi khi cập nhật slot", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Container fluid className="schedule-container">
      <Row className="header-row">
        <Col>
          <h4 className="page-title">
            <FaCalendarAlt className="icon-margin" /> Quản lý Lịch Đặt Chỗ
          </h4>
        </Col>
      </Row>

      <Card className="filter-card">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="filter-label">
                <FaCalendarAlt className="icon-margin" /> Chọn ngày
              </Form.Label>
              <Form.Control 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="form-control-custom"
              />
            </Form.Group>
            
            {selectedDate && (
              <div className="selected-date">
                <FaClock className="icon-margin" />
                <span>{formatDate(selectedDate)}</span>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="loading-container">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      ) : (
        schedule && (
          <Card className="schedule-slots-card">
            <Card.Body>
              <Card.Title className="schedule-card-title">
                <FaClock className="icon-margin" /> Các Khung Giờ
              </Card.Title>
              
              <div className="slots-container">
                {schedule.timeSlots.map((slot, index) => (
                  <Card 
                    key={index} 
                    className={`slot-card ${slot.status === "Booked" ? "booked-slot" : "available-slot"}`}
                  >
                    <Card.Body>
                      <Row className="slot-content">
                        <Col xs={4} className="slot-time">
                          <FaClock className="slot-icon" />
                          <div>{slot.slot}</div>
                        </Col>
                        <Col xs={4} className="slot-status">
                          {slot.status === "Booked" ? (
                            <Badge bg="danger" className="status-badge">
                              <FaTimesCircle className="icon-margin" /> Đã Đặt
                            </Badge>
                          ) : (
                            <Badge bg="success" className="status-badge">
                              <FaCheckCircle className="icon-margin" /> Trống
                            </Badge>
                          )}
                        </Col>
                        <Col xs={4} className="slot-action">
                          <Button
                            variant={slot.status === "Available" ? "primary" : "danger"}
                            size="sm"
                            className="action-button"
                            onClick={() => handleUpdateSlot(slot)}
                          >
                            <FaExchangeAlt className="icon-margin" />
                            {slot.status === "Available" ? "Đặt Chỗ" : "Hủy Chỗ"}
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </div>
              
              <div className="summary-container">
                <div className="summary-item">
                  <Badge bg="success" className="summary-badge">
                    <FaCheckCircle className="icon-margin" />
                    Trống: {schedule.timeSlots.filter(slot => slot.status === "Available").length}
                  </Badge>
                </div>
                <div className="summary-item">
                  <Badge bg="danger" className="summary-badge">
                    <FaTimesCircle className="icon-margin" />
                    Đã Đặt: {schedule.timeSlots.filter(slot => slot.status === "Booked").length}
                  </Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        )
      )}

      {!selectedDate && !loading && (
        <div className="no-date-container">
          <FaCalendarAlt className="no-date-icon" />
          <p>Vui lòng chọn ngày để xem lịch đặt chỗ</p>
        </div>
      )}
    </Container>
  );
};

export default SchedulePage;