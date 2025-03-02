import React, { useState } from "react";
import { FaCalendarCheck, FaFileAlt, FaClock, FaUserAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Container, Navbar, Nav, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GaragePage.css";
import { Typography } from "@mui/material";
import { primaryColor, accentColor } from "../../config/constants";
// Mobile navigation component
const MobileNavMenu = ({ isOpen, onClose }) => (
  <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
    <div className="mobile-menu-close" onClick={onClose}>×</div>
    <div className="mobile-menu-items">
      <div className="mobile-menu-item">
        <FaUserAlt className="me-2" />
        <span>Manager</span>
      </div>
      <div className="mobile-menu-item logout">
        <FaSignOutAlt className="me-2" />
        <span>Đăng xuất</span>
      </div>
    </div>
  </div>
);

// Navigation component with mobile support
const GarageNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      <Navbar bg="white" expand="lg" className="admin-navbar shadow-sm py-2">
        <Container fluid className="px-3">
        <Typography
              variant="h5"
              component="a"
              href="/car-care/home"
              sx={{
                fontWeight: 900,
                color: accentColor,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/logo/Car Care@4x.png"
                alt="logo"
                loading="lazy"
                width="90px"
                style={{ marginRight: "10px" }}
              />
            </Typography>
          <div className="d-lg-none mobile-menu-toggle" onClick={() => setMenuOpen(true)}>
            <FaBars size={20} />
          </div>
          <Nav className="ms-auto d-none d-lg-flex align-items-center">
            <Nav.Link
              href="#"
              className="d-flex align-items-center text-secondary me-3 hover-effect"
            >
              <FaUserAlt className="me-2" />
              Xem với tư cách User
            </Nav.Link>
            <Nav.Link
              href="#"
              className="btn btn-outline-danger btn-sm px-3 d-flex align-items-center"
            >
              <FaSignOutAlt className="me-2" />
              Đăng xuất
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <MobileNavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

// Card component for mobile view
const ActionCard = ({ icon, text, variant, onClick }) => (
  <div 
    className={`action-card bg-${variant}`} 
    onClick={onClick}
  >
    <div className="action-card-icon">
      {icon}
    </div>
    <div className="action-card-text">
      {text}
    </div>
  </div>
);

const GaragePage = () => {
  const navigate = useNavigate();
  
  // Function handlers for button clicks
  const handleBookingClick = () => navigate("/booking");
  const handleReportClick = () => navigate("/report");
  const handleScheduleClick = () => navigate("/schedule");
  
  return (
    <div className="admin-page">
      <GarageNavbar />
      
      <Container fluid className="py-4 px-3">
        
        <div className="action-grid">
          <ActionCard 
            icon={<FaCalendarCheck size={24} />} 
            text="Booking" 
            variant="primary" 
            onClick={handleBookingClick}
          />
          <ActionCard 
            icon={<FaFileAlt size={24} />} 
            text="Report" 
            variant="danger" 
            onClick={handleReportClick}
          />
          <ActionCard 
            icon={<FaClock size={24} />} 
            text="Schedule" 
            variant="success" 
            onClick={handleScheduleClick}
          />
        </div>
      </Container>
    </div>
  );
};

export default GaragePage;