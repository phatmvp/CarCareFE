import React, { useState } from "react";
import { TextField, MenuItem, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookingForm({ setView }) {
  const [carInfo, setCarInfo] = useState("");
  const [condition, setCondition] = useState("");
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleViewHistory = () => {
    navigate("/customer/history");
  };

  const spaPrices = { "Rửa xe": 100000, "Đánh bóng": 500000 };
  const rescuePrices = { "Cẩu xe": 1000000, "Sửa tại chỗ": 300000 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        { carInfo, condition, service, time },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      alert("Đã gửi booking!");
    } catch (error) {
      alert("Lỗi khi gửi booking");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5">Booking Dịch vụ</Typography>
      <TextField
        label="Thông tin xe"
        fullWidth
        margin="normal"
        value={carInfo}
        onChange={(e) => setCarInfo(e.target.value)}
      />
      <TextField
        select
        label="Tình trạng xe"
        fullWidth
        margin="normal"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      >
        <MenuItem value="spa">Spa xe</MenuItem>
        <MenuItem value="rescue">Cứu hộ</MenuItem>
      </TextField>
      {condition && (
        <TextField
          select
          label="Chọn dịch vụ"
          fullWidth
          margin="normal"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          {(condition === "spa"
            ? Object.entries(spaPrices)
            : Object.entries(rescuePrices)
          ).map(([key, value]) => (
            <MenuItem key={key} value={key}>{`${key} - ${value} VNĐ`}</MenuItem>
          ))}
        </TextField>
      )}
      <TextField
        type="datetime-local"
        fullWidth
        margin="normal"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth>
        Gửi Booking
      </Button>
      <Button
        // onClick={() => setView("history")}
        onClick={() => handleViewHistory()}
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
      >
        Xem lịch sử booking
      </Button>
    </Box>
  );
}

export default BookingForm;
