import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [garages, setGarages] = useState([]);
  const [formData, setFormData] = useState({
    customer: "", // Lấy từ localStorage hoặc context nếu có
    garage: "",
    licensePlate: "",
    brand: "",
    model: "",
    year: "",
    service: "",
    date: "",
    time: "",
  });

  // Fetch danh sách gara
  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/garages");

        console.log("Dữ liệu gara nhận được:", response.data); // Kiểm tra dữ liệu API

        // Kiểm tra dữ liệu có phải là mảng hay không trước khi set state
        if (Array.isArray(response.data.garages)) {
          setGarages(response.data.garages); // Nếu API trả về object có key `garages`, lấy `garages`
        } else if (Array.isArray(response.data)) {
          setGarages(response.data); // Nếu trả về mảng trực tiếp, thì set luôn
        } else {
          setGarages([]); // Nếu không phải mảng, set mảng rỗng để tránh lỗi
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gara:", error);
        setGarages([]); // Tránh lỗi khi API fail
      }
    };

    fetchGarages();
  }, []);

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý gửi form đặt lịch
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lấy user từ localStorage và parse thành object
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.id) {
      alert("Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập lại!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/appointment/book",
        {
          customer: user.id, // ✅ Lấy id từ user trong localStorage
          garage: formData.garage,
          vehicle: {
            licensePlate: formData.licensePlate,
            brand: formData.brand,
            model: formData.model,
            year: formData.year,
          },
          service: formData.service,
          date: formData.date,
          time: formData.time,
        }
      );

      alert("Đặt lịch thành công!");
      navigate("/appointments"); // Điều hướng đến trang lịch hẹn
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      alert("Đặt lịch thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Đặt Lịch Hẹn Dịch Vụ
        </Typography>
      </Box>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        {/* Chọn Gara */}
        <TextField
          select
          fullWidth
          label="Chọn Gara"
          name="garage"
          value={formData.garage}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        >
          {garages.map((garage) => (
            <MenuItem key={garage._id} value={garage._id}>
              {garage.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Biển số xe */}
        <TextField
          fullWidth
          label="Biển số xe"
          name="licensePlate"
          value={formData.licensePlate}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        {/* Hãng xe */}
        <TextField
          fullWidth
          label="Hãng xe"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        {/* Mẫu xe */}
        <TextField
          fullWidth
          label="Mẫu xe"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        {/* Năm sản xuất */}
        <TextField
          fullWidth
          label="Năm sản xuất"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        {/* Dịch vụ */}
        <TextField
          fullWidth
          label="Dịch vụ"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        {/* Ngày hẹn */}
        <TextField
          fullWidth
          label="Ngày hẹn"
          name="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        {/* Giờ hẹn */}
        <TextField
          fullWidth
          label="Giờ hẹn"
          name="time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={formData.time}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Đặt Lịch
        </Button>
      </form>
    </Container>
  );
};

export default BookAppointment;
