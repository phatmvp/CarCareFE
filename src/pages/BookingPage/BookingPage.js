import React, { useEffect, useState } from "react";
import { fetchBookings, updateBooking, fetchServiceByName, createBill, fetchAllServices , updateScheduleSlot} from "../../apis";
import { Container, Table, Button, Modal, Form, Card, Badge, Row, Col, Spinner, Accordion, InputGroup } from "react-bootstrap";
import { FaCalendarCheck, FaCheck, FaTimes, FaFileInvoice, FaPlus, FaMinus, FaUser, FaPhone, FaEnvelope, FaClock, FaCalendarAlt } from "react-icons/fa";
import "./BookingPage.css";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [billServices, setBillServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const garageId = "65a4c1e2f4d2b41234abcd10";

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách booking:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();

    // Fetch all services for the bill modal
    const loadAllServices = async () => {
      try {
        const data = await fetchAllServices();
        setAllServices(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      }
    };
    
    loadAllServices();
  }, []);

  const handleUpdateStatus = async (booking, newStatus) => {
    try {
      const updatedBooking = await updateBooking(booking._id, { status: newStatus });
      setBookings((prev) => prev.map((b) => (b._id === booking._id ? updatedBooking : b)));
      const data = {
        date: booking.bookingDate.date,
        slot: booking.bookingDate.timeSlot,
        status: "Booked",
        bookingId: booking._id, // Gán bookingId vào slot
      };
  
      await updateScheduleSlot(garageId, data);
    } catch (error) {
      console.error("Lỗi khi cập nhật booking:", error);
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking || !cancelReason) return;
    try {
        // Tìm booking cần hủy
        const bookingToCancel = bookings.find(b => b._id === selectedBooking._id);
        
        if (!bookingToCancel) {
            console.error("Lỗi: Không tìm thấy booking để hủy");
            return;
        }

        // Gửi yêu cầu cập nhật trạng thái booking
        const updatedBooking = await updateBooking(selectedBooking._id, {
            status: "Cancelled",
            cancelReason,
        });

        // Cập nhật danh sách bookings trong state
        setBookings((prev) => prev.map((b) => (b._id === selectedBooking._id ? updatedBooking : b)));

        // Kiểm tra nếu booking có trạng thái Confirmed hoặc Pending, cập nhật lịch
        if ((bookingToCancel.status === "Confirmed" || bookingToCancel.status === "Pending") &&
            bookingToCancel.bookingDate && bookingToCancel.bookingDate.date) {
            const slotData = {
                date: bookingToCancel.bookingDate.date,
                slot: bookingToCancel.bookingDate.timeSlot,
                status: "Available",
                bookingId: null,
            };

            await updateScheduleSlot(garageId, slotData);
        }

        // Reset state sau khi hủy
        setSelectedBooking(null);
        setCancelReason("");
        setShowCancelModal(false);
    } catch (error) {
        console.error("Lỗi khi hủy booking:", error);
    }
};


  const prepareBill = async (booking) => {
    setSelectedBooking(booking);
    try {
      // Lấy thông tin chi tiết của các dịch vụ từ booking
      const serviceDetails = await Promise.all(
        booking.service.map(async (serviceName) => {
          const service = await fetchServiceByName(serviceName);
          return {
            ...service,
            quantity: 1
          };
        })
      );
      
      setBillServices(serviceDetails);
      calculateTotal(serviceDetails);
      setShowBillModal(true);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin dịch vụ:", error);
    }
  };

  const calculateTotal = (services) => {
    const total = services.reduce((sum, service) => {
      return sum + (service.price * service.quantity);
    }, 0);
    setTotalAmount(total);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedServices = [...billServices];
    updatedServices[index].quantity = Math.max(1, newQuantity);
    setBillServices(updatedServices);
    calculateTotal(updatedServices);
  };

  const handleRemoveService = (index) => {
    const updatedServices = billServices.filter((_, i) => i !== index);
    setBillServices(updatedServices);
    calculateTotal(updatedServices);
  };

  const handleAddService = (serviceId) => {
    if (!serviceId) return;
    
    const serviceToAdd = allServices.find(s => s._id === serviceId);
    if (serviceToAdd) {
      // Kiểm tra xem dịch vụ đã có trong bill chưa
      const existingIndex = billServices.findIndex(s => s._id === serviceToAdd._id);
      
      if (existingIndex !== -1) {
        // Nếu đã có, tăng số lượng
        const updatedServices = [...billServices];
        updatedServices[existingIndex].quantity += 1;
        setBillServices(updatedServices);
        calculateTotal(updatedServices);
      } else {
        // Nếu chưa có, thêm mới với số lượng 1
        const newServices = [...billServices, { ...serviceToAdd, quantity: 1 }];
        setBillServices(newServices);
        calculateTotal(newServices);
      }
    }
  };

  const handleSaveBill = async () => {
    try {
      const billData = {
        bookingId: selectedBooking._id,
        customerId: selectedBooking.customerId,
        customerName: selectedBooking.customerName,
        customerPhone: selectedBooking.customerPhone,
        customerEmail: selectedBooking.customerEmail,
        services: billServices.map(service => ({
          serviceId: service._id,
          name: service.name,
          price: service.price,
          quantity: service.quantity
        })),
        totalAmount: totalAmount,
        paymentStatus: "Unpaid",
        garageId: garageId
      };

      // Gọi API tạo hóa đơn
      const response = await createBill(billData);

      if (response) {
        alert("Tạo hóa đơn thành công!");
        // Cập nhật trạng thái booking thành "Billed"
        const updatedBooking = await updateBooking(selectedBooking._id, { status: "Billed" });
        setBookings((prev) => prev.map((b) => (b._id === selectedBooking._id ? updatedBooking : b)));
        setShowBillModal(false);
      }
    } catch (error) {
      console.error("Lỗi khi tạo hóa đơn:", error);
      alert("Đã xảy ra lỗi khi tạo hóa đơn");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge bg="warning">Chờ xác nhận</Badge>;
      case "Confirmed":
        return <Badge bg="primary">Đã xác nhận</Badge>;
      case "Completed":
        return <Badge bg="success">Hoàn thành</Badge>;
      case "Cancelled":
        return <Badge bg="danger">Đã hủy</Badge>;
      case "Billed":
        return <Badge bg="info">Đã xuất hóa đơn</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Hiển thị Mobile Card cho mỗi booking
  const renderBookingCard = (booking) => (
    <Card className="booking-card mb-3" key={booking._id}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span className="customer-name">{booking.customerName}</span>
        {getStatusBadge(booking.status)}
      </Card.Header>
      <Card.Body>
        <div className="booking-info">
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <span>{booking.customerEmail}</span>
          </div>
          <div className="info-item">
            <FaPhone className="info-icon" />
            <span>{booking.customerPhone}</span>
          </div>
          <div className="info-item">
            <FaCalendarAlt className="info-icon" />
            <span>{booking.bookingDate.date}</span>
          </div>
          <div className="info-item">
            <FaClock className="info-icon" />
            <span>{booking.bookingDate.timeSlot}</span>
          </div>
        </div>
        
        <Accordion className="mt-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Dịch vụ đã đặt</Accordion.Header>
            <Accordion.Body>
              <ul className="service-list">
                {booking.service.map((service, idx) => (
                  <li key={idx}>{service}</li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        
        <div className="action-buttons mt-3">
          {booking.status === "Pending" && (
            <Button 
              variant="success" 
              size="sm" 
              className="me-2"
              onClick={() => handleUpdateStatus(booking, "Confirmed")}
            >
              <FaCheck className="me-1" /> Xác nhận
            </Button>
          )}
          
          {booking.status === "Confirmed" && (
            <Button 
              variant="primary" 
              size="sm" 
              className="me-2"
              onClick={() => handleUpdateStatus(booking, "Completed")}
            >
              <FaCalendarCheck className="me-1" /> Hoàn thành
            </Button>
          )}
          
          {booking.status === "Completed" && (
            <Button 
              variant="info" 
              size="sm" 
              className="me-2"
              onClick={() => prepareBill(booking)}
            >
              <FaFileInvoice className="me-1" /> Tạo hóa đơn
            </Button>
          )}
          
          {(booking.status === "Pending" || booking.status === "Confirmed") && (
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => {
                setSelectedBooking(booking);
                setShowCancelModal(true);
              }}
            >
              <FaTimes className="me-1" /> Hủy
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="booking-page">
      <Container fluid className="py-3">
        <div className="page-header mb-4">
          <h2 className="text-center">Quản lý Đặt lịch</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div>
            {/* Desktop View */}
            <div className="d-none d-lg-block">
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Tên khách</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Dịch vụ</th>
                    <th>Ngày giờ</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.customerName}</td>
                      <td>{booking.customerEmail}</td>
                      <td>{booking.customerPhone}</td>
                      <td>{booking.service.join(", ")}</td>
                      <td>{`${booking.bookingDate.date} - ${booking.bookingDate.timeSlot}`}</td>
                      <td>{getStatusBadge(booking.status)}</td>
                      <td>
                        {booking.status === "Pending" && (
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleUpdateStatus(booking, "Confirmed")}
                          >
                            <FaCheck className="me-1" /> Xác nhận
                          </Button>
                        )}
                        
                        {booking.status === "Confirmed" && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleUpdateStatus(booking, "Completed")}
                          >
                            <FaCalendarCheck className="me-1" /> Hoàn thành
                          </Button>
                        )}
                        
                        {booking.status === "Completed" && (
                          <Button
                            variant="info"
                            size="sm"
                            className="me-2"
                            onClick={() => prepareBill(booking)}
                          >
                            <FaFileInvoice className="me-1" /> Tạo hóa đơn
                          </Button>
                        )}
                        
                        {(booking.status === "Pending" || booking.status === "Confirmed") && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowCancelModal(true);
                            }}
                          >
                            <FaTimes className="me-1" /> Hủy
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            {/* Mobile View */}
            <div className="d-lg-none">
              <div className="booking-list">
                {bookings.map(booking => renderBookingCard(booking))}
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* Modal hủy booking */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lý do hủy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập lý do hủy..."
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleCancelBooking}>
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal tạo hóa đơn */}
      <Modal size="lg" show={showBillModal} onHide={() => setShowBillModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo Hóa Đơn</Modal.Title>
        </Modal.Header>
        {selectedBooking && (
          <Modal.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Card className="h-100">
                  <Card.Body>
                    <h6 className="card-subtitle mb-2">Thông tin khách hàng:</h6>
                    <div className="customer-info">
                      <div className="info-item">
                        <FaUser className="info-icon" />
                        <span>{selectedBooking.customerName}</span>
                      </div>
                      <div className="info-item">
                        <FaPhone className="info-icon" />
                        <span>{selectedBooking.customerPhone}</span>
                      </div>
                      <div className="info-item">
                        <FaEnvelope className="info-icon" />
                        <span>{selectedBooking.customerEmail}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="h-100">
                  <Card.Body>
                    <h6 className="card-subtitle mb-2">Thông tin đặt lịch:</h6>
                    <div className="booking-info">
                      <div className="info-item">
                        <FaCalendarAlt className="info-icon" />
                        <span>{selectedBooking.bookingDate.date}</span>
                      </div>
                      <div className="info-item">
                        <FaClock className="info-icon" />
                        <span>{selectedBooking.bookingDate.timeSlot}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="mb-3">
              <Card.Header>
                <h6 className="mb-0">Danh sách dịch vụ</h6>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table className="mb-0">
                    <thead>
                      <tr>
                        <th>Tên dịch vụ</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billServices.map((service, index) => (
                        <tr key={index}>
                          <td>{service.name}</td>
                          <td>{service.price.toLocaleString()}đ</td>
                          <td>
                            <InputGroup size="sm" style={{ width: "100px" }}>
                              <Button 
                                variant="outline-secondary" 
                                onClick={() => handleQuantityChange(index, service.quantity - 1)}
                              >
                                <FaMinus />
                              </Button>
                              <Form.Control
                                type="number"
                                min="1"
                                value={service.quantity}
                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                              />
                              <Button 
                                variant="outline-secondary" 
                                onClick={() => handleQuantityChange(index, service.quantity + 1)}
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
                              <FaTimes />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-end fw-bold">Tổng cộng:</td>
                        <td colSpan="2" className="fw-bold">{totalAmount.toLocaleString()}đ</td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Thêm dịch vụ:</Form.Label>
                  <Form.Select onChange={(e) => handleAddService(e.target.value)}>
                    <option value="">Chọn dịch vụ...</option>
                    {allServices.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.name} - {service.price.toLocaleString()}đ
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBillModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveBill}>
            Lưu hóa đơn
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingPage;