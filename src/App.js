import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import GaragesList from "./component/AllGarage/GaragesList";
import GarageDetail from "./component/AllGarage/GarageDetail";
import BookAppointment from "./pages/Book/BookAppointment";
import GaragePage from "./pages/GaragePage/GaragePage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import ReportPage from "./pages/ReportPage/ReportPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import Layout from "./component/Layout/Layout";
import GarageAppointments from "./pages/Book/GarageAppointments";
import AppointmentBooking from "./pages/Book/AppointmentBooking";
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
          path="/garages/:garageId"
          element={
            <Layout>
              <GarageDetail />
            </Layout>
          }
        />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/garageside" element={<GaragePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/report" element={<ReportPage />} />

        <Route path="/gara-manager" element={<GarageAppointments />} />
        <Route path="/book" element={<AppointmentBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
