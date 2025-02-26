import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";

function BookingHistory({ setView }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setBookings(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Không thể tải lịch sử booking");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (bookingId) => {
    setView("feedback", bookingId); // Truyền bookingId để dùng trong FeedbackForm
  };

  return (
    <Box sx={{ mt: 3, maxWidth: "100%", mx: "auto" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Lịch sử Booking
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      ) : bookings.length === 0 ? (
        <Typography align="center" sx={{ mt: 2 }}>
          Chưa có booking nào.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thông tin xe</TableCell>
                <TableCell>Dịch vụ</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.carInfo}</TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>
                    {new Date(booking.time).toLocaleString()}
                  </TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                    {booking.status === "completed" && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleFeedback(booking._id)}
                      >
                        Feedback
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => setView("main")}
      >
        Quay lại
      </Button>
    </Box>
  );
}

export default BookingHistory;
