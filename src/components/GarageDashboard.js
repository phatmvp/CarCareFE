import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";

function GarageDashboard() {
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetchBookings();
    fetchAvailability();
  }, [date]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setBookings(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy booking:", error);
    }
  };

  const fetchAvailability = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/availability?date=${date}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      console.log("Thời gian đã đặt:", res.data);
    } catch (error) {
      console.error("Lỗi khi kiểm tra thời gian:", error);
    }
  };

  const handleAction = async (id, status, reason = "") => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        { status, reason },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      fetchBookings();
    } catch (error) {
      alert("Lỗi khi xử lý booking");
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Dashboard Gara</Typography>
      <TextField
        label="Chọn ngày"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ mt: 2, mb: 2 }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Khách hàng</TableCell>
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
              <TableCell>{booking.customerId?.username || "N/A"}</TableCell>
              <TableCell>{booking.carInfo}</TableCell>
              <TableCell>{booking.service}</TableCell>
              <TableCell>{new Date(booking.time).toLocaleString()}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                {booking.status === "pending" && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAction(booking._id, "accepted")}
                      sx={{ mr: 1 }}
                    >
                      Nhận
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        const reason = prompt("Lý do không nhận:");
                        if (reason)
                          handleAction(booking._id, "rejected", reason);
                      }}
                    >
                      Không nhận
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default GarageDashboard;
