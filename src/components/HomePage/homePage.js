import React from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css"; // Custom CSS file
import imgCare from "../../asset/home.webp";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand logo" href="#">
            Cars.
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Review
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Featured
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>

            <div className="social-icons">
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container hero-section">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 content-left">
            <h1 className="main-heading">Car Dealing Experience.</h1>
            <h2 className="sub-heading">Redefined!</h2>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At, non
              unde! Vitae vero, dolores, vel ex voluptates voluptate delectus
              veniam ipsum laudantium recusandae aut iusto, ratione maiores
              magni.
            </p>
            <button className="btn explore-btn">Explore Cars</button>
          </div>

          {/* Right Content with Car Image */}
          <div className="col-lg-6 content-right">
            <div className="image-container">
              <img src={imgCare} alt="Blue Sports Car" className="car-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
