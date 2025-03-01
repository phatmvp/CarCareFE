import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import GaragesList from "./component/AllGarage/GaragesList";
import GarageDetail from "./component/AllGarage/GarageDetail";
import BookAppointment from "./pages/Book/BookAppointment";
import Layout from "./component/Layout/Layout";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
