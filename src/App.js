
import BookingPage from "./component/BookingPage/BookingPage";
import AdminPage from "./component/AdminPage/AdminPage";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import SchedulePage from "./component/SchedulePage/SchedulePage";
import ReportPage from "./component/ReportPage/ReportPage";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<AdminPage />} />
    <Route path="/booking" element={<BookingPage />} />
    <Route path="/schedule" element={<SchedulePage />} />
    <Route path="/report" element={<ReportPage />} />

    </Routes>
   </BrowserRouter>
  );
}

export default App;
