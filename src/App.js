import HomePage from "./component/HomePage/HomePage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
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
            <LoginPage />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
