import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import HomePage from "./components/HomePage";
import CustomerLoginPage from "./components/CustomerLoginPage";
import CustomerRegisterPage from "./components/CustomerRegisterPage";
import GarageLoginPage from "./components/GarageLoginPage";
import GarageRegisterPage from "./components/GarageRegisterPage";
import BookingForm from "./components/BookingForm";
import BookingHistory from "./components/BookingHistory";
import FeedbackForm from "./components/FeedbackForm";
import GarageDashboard from "./components/GarageDashboard";
import { Container, Button } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

function AppContent() {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [currentView, setCurrentView] = useState("main");
  const navigate = useNavigate();

  // Kiểm tra token khi load trang để tự động đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserType(decoded.role);
        setUsername(decoded.username || "User"); // Giả định backend trả username trong token
        setIsLoggedIn(true);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
    setUsername(jwtDecode(localStorage.getItem("token")).username || "User");
    setCurrentView("main");
    navigate(type === "customer" ? "/customer/dashboard" : "/garage/dashboard");
  };

  const handleLogout = () => {
    setUserType(null);
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSetView = (view, bookingId) => {
    setCurrentView(bookingId ? [view, bookingId] : view);
  };

  const handleLoginClick = () => navigate("/loginCustomer");
  const handleRegisterClick = (role) =>
    navigate(role === "customer" ? "/registerCustomer" : "/registerGarage");
  const handleHistoryClick = () =>
    isLoggedIn && userType === "customer"
      ? navigate("/customer/history")
      : navigate("/loginCustomer");
  const handleServiceClick = () =>
    isLoggedIn && userType === "customer"
      ? navigate("/customer/dashboard")
      : navigate("/loginCustomer");

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              onHistoryClick={handleHistoryClick}
              onServiceClick={handleServiceClick}
              isLoggedIn={isLoggedIn}
              userType={userType}
              username={username}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/loginCustomer"
          element={<CustomerLoginPage onLogin={handleLogin} />}
        />
        <Route path="/registerCustomer" element={<CustomerRegisterPage />} />
        <Route
          path="/loginGarage"
          element={<GarageLoginPage onLogin={handleLogin} />}
        />
        <Route path="/registerGarage" element={<GarageRegisterPage />} />

        {isLoggedIn && userType === "customer" && (
          <>
            <Route
              path="/customer/dashboard"
              element={
                <Container>
                  <BookingForm setView={handleSetView} />
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                  >
                    Đăng xuất
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    variant="outlined"
                    sx={{ mt: 2, ml: 2 }}
                  >
                    Trang chủ
                  </Button>
                </Container>
              }
            />
            <Route
              path="/customer/history"
              element={
                <Container>
                  <BookingHistory setView={handleSetView} />
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                  >
                    Đăng xuất
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    variant="outlined"
                    sx={{ mt: 2, ml: 2 }}
                  >
                    Trang chủ
                  </Button>
                </Container>
              }
            />
            <Route
              path="/customer/feedback/:bookingId"
              element={
                <Container>
                  <FeedbackForm
                    setView={handleSetView}
                    bookingId={window.location.pathname.split("/")[3]}
                  />
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                  >
                    Đăng xuất
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    variant="outlined"
                    sx={{ mt: 2, ml: 2 }}
                  >
                    Trang chủ
                  </Button>
                </Container>
              }
            />
          </>
        )}
        {isLoggedIn && userType === "garage" && (
          <Route
            path="/garage/dashboard"
            element={
              <Container>
                <GarageDashboard />
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                >
                  Đăng xuất
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  variant="outlined"
                  sx={{ mt: 2, ml: 2 }}
                >
                  Trang chủ
                </Button>
              </Container>
            }
          />
        )}
      </Routes>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
