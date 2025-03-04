import React, { useState } from "react";
import {
  FaCalendarCheck,
  FaFileAlt,
  FaClock,
  FaUserAlt,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { Container, Navbar, Nav, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GaragePage.css";
import { Typography } from "@mui/material";
import { primaryColor, accentColor } from "../../config/constants";

// Card component for mobile view
const ActionCard = ({ icon, text, variant, onClick }) => (
  <div className={`action-card bg-${variant}`} onClick={onClick}>
    <div className="action-card-icon">{icon}</div>
    <div className="action-card-text">{text}</div>
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
