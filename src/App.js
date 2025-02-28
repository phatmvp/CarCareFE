
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import Login from './pages/Login/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/car-care/home" />} />
        <Route
          path="/car-care/home"
          element={
            <HomePage />
          }
        />
        <Route
          path="/car-care/login"
          element={
            <Login />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
