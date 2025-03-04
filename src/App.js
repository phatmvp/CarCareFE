import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import GaragesList from "./pages/GaragesList/GaragesList";
import GarageDetail from "./pages/GarageDetail/GarageDetail";
import BookAppointment from "./pages/Book/BookAppointment";
import GaragePage from "./pages/GaragePage/GaragePage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import ReportPage from "./pages/ReportPage/ReportPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import Layout from "./component/Layout/Layout";
import LayoutGarage from "./component/LayoutGarage/LayoutGarage";
import BookingConfirmation from "./pages/BookingConfirmationPage/BookingConfirmation";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/car-care/home" />} />
        <Route
          path="/car-care/home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/car-care/login" element={<Login />} />
        <Route
          path="/car-care/allGara"
          element={
            <Layout>
              <GaragesList />
            </Layout>
          }
        />
        <Route
          path="/car-care/booking-confirmation"
          element={
            <Layout>
              <BookingConfirmation />
            </Layout>
          }
        />
        <Route
          path="/garages/:garageId"
          element={
            <Layout>
              <GarageDetail />
            </Layout>
          }
        />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route
          path="/garageside"
          element={
            <LayoutGarage>
              {" "}
              <GaragePage />
            </LayoutGarage>
          }
        />
        <Route
          path="/booking"
          element={
            <LayoutGarage>
              {" "}
              <BookingPage />
            </LayoutGarage>
          }
        />
        <Route
          path="/schedule"
          element={
            <LayoutGarage>
              <SchedulePage />
            </LayoutGarage>
          }
        />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
