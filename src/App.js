import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CustomerLogin from "./components/CustomerLogin";
import CustomerRegister from "./components/CustomerRegister";
import BookingForm from "./components/BookingForm";
import BookingHistory from "./components/BookingHistory";
import FeedbackForm from "./components/FeedbackForm";
import GarageLogin from "./components/GarageLogin";
import GarageRegister from "./components/GarageRegister"; // Thêm import mới
import GarageDashboard from "./components/GarageDashboard";
import { Container, Typography, Button, Box } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

function App() {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("login"); // Có thể là string hoặc array [view, bookingId]

  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
    setCurrentView("main");
  };

  const handleLogout = () => {
    setUserType(null);
    setIsLoggedIn(false);
    setCurrentView("login");
  };

  const handleSetView = (view, bookingId) => {
    setCurrentView(bookingId ? [view, bookingId] : view);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          CarCare
        </Typography>
        {!isLoggedIn ? (
          <>
            {currentView === "login" && (
              <Box sx={{ maxWidth: 400, mx: "auto" }}>
                <CustomerLogin onLogin={() => handleLogin("customer")} />
                <GarageLogin onLogin={() => handleLogin("garage")} />
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() => handleSetView("customerRegister")}
                    variant="outlined"
                    color="primary"
                  >
                    Đăng ký (Khách hàng)
                  </Button>
                  <Button
                    onClick={() => handleSetView("garageRegister")}
                    variant="outlined"
                    color="secondary"
                  >
                    Đăng ký Garage
                  </Button>
                </Box>
              </Box>
            )}
            {currentView === "customerRegister" && (
              <CustomerRegister onBack={() => handleSetView("login")} />
            )}
            {currentView === "garageRegister" && (
              <GarageRegister onBack={() => handleSetView("login")} />
            )}
          </>
        ) : (
          <>
            {userType === "customer" && (
              <>
                {currentView === "main" && (
                  <BookingForm setView={handleSetView} />
                )}
                {currentView === "history" && (
                  <BookingHistory setView={handleSetView} />
                )}
                {Array.isArray(currentView) &&
                  currentView[0] === "feedback" && (
                    <FeedbackForm
                      setView={handleSetView}
                      bookingId={currentView[1]}
                    />
                  )}
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="secondary"
                >
                  Đăng xuất
                </Button>
              </>
            )}
            {userType === "garage" && (
              <>
                <GarageDashboard />
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="secondary"
                >
                  Đăng xuất
                </Button>
              </>
            )}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
