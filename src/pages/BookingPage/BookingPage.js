import React, { useCallback, useEffect, useState } from "react";
import {
  fetchBookings,
  updateBooking,
  fetchServiceByName,
  createBill,
  fetchAllServices,
  updateScheduleSlot,
} from "../../apis";
import {
  Container,
  Button,
  Modal,
  Form,
  Card,
  Badge,
  Row,
  Col,
  Spinner,
  Accordion,
  InputGroup,
  Dropdown,
  ProgressBar,
  Nav,
} from "react-bootstrap";
import {
  FaCalendarCheck,
  FaCheck,
  FaTimes,
  FaFileInvoice,
  FaPlus,
  FaMinus,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCalendarAlt,
  FaFilter,
  FaSort,
  FaSearch,
  FaMoneyBillWave,
  FaListUl,
} from "react-icons/fa";
import axios from "axios";
import "./BookingPage.css"; // Make sure to create this CSS file

const BookingPage = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [billServices, setBillServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const API_BASE_URL = "http://localhost:5000/api";

  const fetchUsersData = useCallback(
    async (bookingsData) => {
      try {
        if (bookingsData.length === 0) return;

        const customerIds = bookingsData.map((book) => book.customerId);
        const userPromises = customerIds.map((id) =>
          axios.get(`${API_BASE_URL}/user/${id}`)
        );

        const results = await Promise.allSettled(userPromises);
        const users = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value.data.user);

        setUsers(users);
      } catch (err) {
        console.error("Fetch user error:", err);
        throw err;
      }
    },
    [API_BASE_URL]
  );

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchBookings();
      setBookings(data);
      setFilteredBookings(data);
      await fetchUsersData(data);
    } catch (error) {
      console.error("Booking load error:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchUsersData]);

  const loadAllServices = useCallback(async () => {
    try {
      const data = await fetchAllServices();
      setAllServices(data);
    } catch (error) {
      console.error("Service load error:", error);
    }
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      await loadBookings();
      await loadAllServices();
    };
    initializeData();
  }, [loadBookings, loadAllServices]);

  useEffect(() => {
    // Filter bookings when filter or search changes
    let result = [...bookings];

    // Apply status filter
    if (activeFilter !== "all") {
      result = result.filter((booking) => booking.status === activeFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter((booking) => {
        const user = users.find((u) => u._id === booking.customerId);
        return (
          (user?.fullName || "").toLowerCase().includes(lowercasedSearch) ||
          (user?.email || "").toLowerCase().includes(lowercasedSearch) ||
          (user?.phone || "").toLowerCase().includes(lowercasedSearch)
        );
      });
    }

    setFilteredBookings(result);
  }, [activeFilter, searchTerm, bookings, users]);

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

  const handleAcceptBooking = async (bookingID) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:5000/booking/${bookingID}`, {
        status: "Confirmed",
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingID
            ? { ...booking, status: "Confirmed" }
            : booking
        )
      );
    } catch (err) {
      console.error("Error:", err);
      alert("Cập nhật trạng thái thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteBooking = async (bookingID) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:5000/booking/${bookingID}`, {
        status: "Completed",
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingID
            ? { ...booking, status: "Completed" }
            : booking
        )
      );
    } catch (err) {
      console.error("Error:", err);
      alert("Cập nhật trạng thái thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingID) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:5000/booking/${bookingID}`, {
        status: "Cancelled",
        cancelReason: cancelReason,
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingID
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
      setShowCancelModal(false);
      setCancelReason("");
    } catch (err) {
      console.error("Error:", err);
      alert("Cập nhật trạng thái thất bại");
    } finally {
      setLoading(false);
    }
  };

  const prepareBill = (booking) => {
    // Convert booking services to bill services
    const services = booking.services
      .map((service) => {
        const serviceDetails = allServices.find(
          (s) => s._id === service.serviceId
        );
        return {
          id: serviceDetails?._id,
          name: serviceDetails?.name,
          price: serviceDetails?.price || 0,
          quantity: 1,
        };
      })
      .filter((s) => s.name); // Filter out any services that couldn't be found

    setBillServices(services);
    calculateTotal(services);
    setSelectedBooking(booking);
    setShowBillModal(true);
  };

  const calculateTotal = (services) => {
    const total = services.reduce(
      (sum, service) => sum + service.price * service.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedServices = [...billServices];
    updatedServices[index].quantity = newQuantity;
    setBillServices(updatedServices);
    calculateTotal(updatedServices);
  };

  const handleAddService = (serviceId) => {
    if (!serviceId) return;

    const serviceToAdd = allServices.find((s) => s._id === serviceId);
    if (!serviceToAdd) return;

    // Check if service already exists in bill
    const existingIndex = billServices.findIndex((s) => s.id === serviceId);

    if (existingIndex >= 0) {
      // Increment quantity if service already exists
      handleQuantityChange(
        existingIndex,
        billServices[existingIndex].quantity + 1
      );
    } else {
      // Add new service
      const newService = {
        id: serviceToAdd._id,
        name: serviceToAdd.name,
        price: serviceToAdd.price,
        quantity: 1,
      };

      const updatedServices = [...billServices, newService];
      setBillServices(updatedServices);
      calculateTotal(updatedServices);
    }
  };

  const handleRemoveService = (index) => {
    const updatedServices = billServices.filter((_, idx) => idx !== index);
    setBillServices(updatedServices);
    calculateTotal(updatedServices);
  };

  const handleSaveBill = async () => {
    try {
      setLoading(true);

      // Create bill data structure
      const billData = {
        bookingId: selectedBooking._id,
        customerId: selectedBooking.customerId,
        services: billServices.map((service) => ({
          serviceId: service.id,
          quantity: service.quantity,
          price: service.price,
        })),
        totalAmount: totalAmount,
        createdAt: new Date(),
      };

      // Call API to create bill
      await createBill(billData);

      // Update booking status to Billed
      await updateBooking(selectedBooking._id, { status: "Billed" });

      // Update local state
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, status: "Billed" }
            : booking
        )
      );

      setShowBillModal(false);
      alert("Hóa đơn đã được tạo thành công!");
    } catch (error) {
      console.error("Error creating bill:", error);
      alert("Tạo hóa đơn thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // Dashboard stats
  const getStatusCounts = () => {
    const counts = {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === "Pending").length,
      confirmed: bookings.filter((b) => b.status === "Confirmed").length,
      completed: bookings.filter((b) => b.status === "Completed").length,
      cancelled: bookings.filter((b) => b.status === "Cancelled").length,
      billed: bookings.filter((b) => b.status === "Billed").length,
    };

    return counts;
  };

  const renderBookingCard = (booking) => {
    const user = users.find((u) => u._id === booking.customerId);
    const serviceNames = booking.services
      .map((service) => {
        const matchedService = allServices.find(
          (s) => s._id.toString() === service.serviceId.toString()
        );
        return matchedService?.name;
      })
      .filter(Boolean)
      .join(", ");

    return (
      <Card className="booking-card mb-3" key={booking._id}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">
            {user?.fullName || booking.customerName || "Không xác định"}
          </span>
          {getStatusBadge(booking.status)}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col xs={6} md={3}>
              <div className="info-item">
                <FaEnvelope className="info-icon text-primary me-2" />
                <span className="text-truncate">
                  {user?.email || booking.customerEmail}
                </span>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="info-item">
                <FaPhone className="info-icon text-primary me-2" />
                <span>{user?.phone || booking.customerPhone}</span>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="info-item">
                <FaCalendarAlt className="info-icon text-primary me-2" />
                <span>
                  {booking.bookingDate ||
                    (booking.bookingDate && booking.bookingDate.date)}
                </span>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="info-item">
                <FaClock className="info-icon text-primary me-2" />
                <span>
                  {booking.bookingTime ||
                    (booking.bookingDate && booking.bookingDate.timeSlot)}
                </span>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} md={8}>
              <div className="info-item">
                <FaListUl className="info-icon text-primary me-2" />
                <span className="fw-bold">Dịch vụ:</span> {serviceNames}
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="info-item">
                <FaMoneyBillWave className="info-icon text-primary me-2" />
                <span className="fw-bold">Tổng tiền:</span>{" "}
                {booking.totalPrice?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                }) || "Chưa cập nhật"}
              </div>
            </Col>
          </Row>

          <div className="action-buttons d-flex flex-wrap gap-2 mt-3">
            {booking.status === "Pending" && (
              <Button
                onClick={() => handleAcceptBooking(booking._id)}
                variant="success"
                size="sm"
              >
                <FaCheck className="me-1" /> Xác nhận
              </Button>
            )}

            {booking.status === "Confirmed" && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleCompleteBooking(booking._id)}
              >
                <FaCalendarCheck className="me-1" /> Hoàn thành
              </Button>
            )}

            {booking.status === "Completed" && (
              <Button
                variant="info"
                size="sm"
                onClick={() => prepareBill(booking)}
              >
                <FaFileInvoice className="me-1" /> Tạo hóa đơn
              </Button>
            )}

            {(booking.status === "Pending" ||
              booking.status === "Confirmed") && (
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
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="booking-page">
      <Container fluid className="py-3">
        <div className="page-header mb-4">
          <h2 className="text-primary">Quản lý Đặt lịch</h2>
          <p className="text-muted">Tất cả đơn đặt lịch của khách hàng</p>
        </div>

        {/* Stats Dashboard */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row>
              <Col sm={6} md className="mb-3 mb-md-0">
                <div className="stat-item">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Tổng đơn</span>
                    <span className="fw-bold">{statusCounts.total}</span>
                  </div>
                  <ProgressBar now={100} variant="primary" />
                </div>
              </Col>
              <Col sm={6} md className="mb-3 mb-md-0">
                <div className="stat-item">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Chờ xác nhận</span>
                    <span className="fw-bold">{statusCounts.pending}</span>
                  </div>
                  <ProgressBar
                    now={(statusCounts.pending / statusCounts.total) * 100}
                    variant="warning"
                  />
                </div>
              </Col>
              <Col sm={6} md className="mb-3 mb-md-0">
                <div className="stat-item">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Đã xác nhận</span>
                    <span className="fw-bold">{statusCounts.confirmed}</span>
                  </div>
                  <ProgressBar
                    now={(statusCounts.confirmed / statusCounts.total) * 100}
                    variant="primary"
                  />
                </div>
              </Col>
              <Col sm={6} md className="mb-3 mb-md-0">
                <div className="stat-item">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Hoàn thành</span>
                    <span className="fw-bold">{statusCounts.completed}</span>
                  </div>
                  <ProgressBar
                    now={(statusCounts.completed / statusCounts.total) * 100}
                    variant="success"
                  />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Search and Filter Controls */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={6} lg={4} className="mb-3 mb-md-0">
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Tìm kiếm theo tên, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={6} lg={8}>
                <Nav className="booking-filter-nav">
                  <Nav.Item>
                    <Nav.Link
                      className={activeFilter === "all" ? "active" : ""}
                      onClick={() => setActiveFilter("all")}
                    >
                      Tất cả
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={activeFilter === "Pending" ? "active" : ""}
                      onClick={() => setActiveFilter("Pending")}
                    >
                      Chờ xác nhận
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={activeFilter === "Confirmed" ? "active" : ""}
                      onClick={() => setActiveFilter("Confirmed")}
                    >
                      Đã xác nhận
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={activeFilter === "Completed" ? "active" : ""}
                      onClick={() => setActiveFilter("Completed")}
                    >
                      Hoàn thành
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={activeFilter === "Billed" ? "active" : ""}
                      onClick={() => setActiveFilter("Billed")}
                    >
                      Đã xuất hóa đơn
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={activeFilter === "Cancelled" ? "active" : ""}
                      onClick={() => setActiveFilter("Cancelled")}
                    >
                      Đã hủy
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="booking-list">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => renderBookingCard(booking))
            ) : (
              <Card className="text-center py-5">
                <Card.Body>
                  <h5>Không có đơn đặt lịch nào</h5>
                  <p className="text-muted">
                    Thử thay đổi bộ lọc hoặc tìm kiếm
                  </p>
                </Card.Body>
              </Card>
            )}
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
          <Button
            variant="danger"
            onClick={() => handleCancelBooking(selectedBooking._id)}
          >
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal tạo hóa đơn */}
      <Modal
        size="lg"
        show={showBillModal}
        onHide={() => setShowBillModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo Hóa Đơn</Modal.Title>
        </Modal.Header>
        {selectedBooking && (
          <Modal.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Card className="h-100">
                  <Card.Body>
                    <h6 className="card-subtitle mb-3">
                      Thông tin khách hàng:
                    </h6>
                    <div className="customer-info">
                      <div className="info-item mb-2">
                        <FaUser className="info-icon me-2 text-primary" />
                        <span>
                          {users.find(
                            (u) => u._id === selectedBooking.customerId
                          )?.fullName || selectedBooking.customerName}
                        </span>
                      </div>
                      <div className="info-item mb-2">
                        <FaPhone className="info-icon me-2 text-primary" />
                        <span>
                          {users.find(
                            (u) => u._id === selectedBooking.customerId
                          )?.phone || selectedBooking.customerPhone}
                        </span>
                      </div>
                      <div className="info-item">
                        <FaEnvelope className="info-icon me-2 text-primary" />
                        <span>
                          {users.find(
                            (u) => u._id === selectedBooking.customerId
                          )?.email || selectedBooking.customerEmail}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="h-100">
                  <Card.Body>
                    <h6 className="card-subtitle mb-3">Thông tin đặt lịch:</h6>
                    <div className="booking-info">
                      <div className="info-item mb-2">
                        <FaCalendarAlt className="info-icon me-2 text-primary" />
                        <span>
                          {selectedBooking.bookingDate ||
                            (selectedBooking.bookingDate &&
                              selectedBooking.bookingDate.date)}
                        </span>
                      </div>
                      <div className="info-item">
                        <FaClock className="info-icon me-2 text-primary" />
                        <span>
                          {selectedBooking.bookingTime ||
                            (selectedBooking.bookingDate &&
                              selectedBooking.bookingDate.timeSlot)}
                        </span>
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
              <Card.Body>
                {billServices.length > 0 ? (
                  billServices.map((service, index) => (
                    <Row
                      key={index}
                      className="service-item py-2 border-bottom align-items-center"
                    >
                      <Col xs={12} md={5}>
                        <span className="fw-medium">{service.name}</span>
                      </Col>
                      <Col xs={4} md={2}>
                        <small className="text-muted">Đơn giá:</small>
                        <div>{service.price.toLocaleString()}đ</div>
                      </Col>
                      <Col xs={4} md={2}>
                        <InputGroup size="sm">
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
                      </Col>
                      <Col xs={3} md={2}>
                        <small className="text-muted">Thành tiền:</small>
                        <div>
                          {(service.price * service.quantity).toLocaleString()}đ
                        </div>
                      </Col>
                      <Col xs={1} md={1} className="text-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveService(index)}
                        >
                          <FaTimes />
                        </Button>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <p className="text-center text-muted my-3">
                    Chưa có dịch vụ nào
                  </p>
                )}

                <Row className="mt-4">
                  <Col xs={12} className="text-end">
                    <h5>
                      Tổng cộng:{" "}
                      <span className="text-primary">
                        {totalAmount.toLocaleString()}đ
                      </span>
                    </h5>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Thêm dịch vụ:</Form.Label>
                  <Form.Select
                    onChange={(e) => handleAddService(e.target.value)}
                  >
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
