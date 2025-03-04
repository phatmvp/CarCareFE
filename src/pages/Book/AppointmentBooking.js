import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Box,
  Snackbar,
  Alert,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

// Đường dẫn API
const API_URL = "http://localhost:5000/appointment";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    customer: "",
    garage: "",
    vehicle: "",
    service: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [garages, setGarages] = useState([]);
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Fetch danh sách gara và dịch vụ khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách gara (giả định có API endpoint cho gara)
        const garagesResponse = await axios.get(`${API_URL}/garages`);
        setGarages(garagesResponse.data);

        // Lấy danh sách dịch vụ (giả định có API endpoint cho dịch vụ)
        const servicesResponse = await axios.get(`${API_URL}/services`);
        setServices(servicesResponse.data);

        // Lấy danh sách xe của người dùng (giả định có API endpoint và đã đăng nhập)
        const vehiclesResponse = await axios.get(`${API_URL}/user/vehicles`);
        setVehicles(vehiclesResponse.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setSnackbar({
          open: true,
          message: "Không thể tải dữ liệu cần thiết. Vui lòng thử lại sau.",
          severity: "error",
        });
      }
    };

    fetchData();
  }, []);

  // Xử lý khi người dùng thay đổi input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Xóa lỗi khi người dùng chỉnh sửa trường
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Kiểm tra form hợp lệ
  const validateForm = () => {
    const newErrors = {};

    if (!formData.customer.trim()) {
      newErrors.customer = "Vui lòng nhập tên của bạn";
    }

    if (!formData.garage) {
      newErrors.garage = "Vui lòng chọn gara";
    }

    if (!formData.vehicle) {
      newErrors.vehicle = "Vui lòng chọn xe";
    }

    if (!formData.service) {
      newErrors.service = "Vui lòng chọn dịch vụ";
    }

    if (!formData.date) {
      newErrors.date = "Vui lòng chọn ngày";
    } else {
      // Kiểm tra ngày hợp lệ (không phải ngày trong quá khứ)
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Ngày không được là ngày trong quá khứ";
      }
    }

    if (!formData.time) {
      newErrors.time = "Vui lòng chọn giờ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Chuẩn bị dữ liệu để gửi đến API
      const bookingData = {
        customer: formData.customer,
        garage: formData.garage,
        vehicle: formData.vehicle,
        service: formData.service,
        date: formData.date, // Đã là format YYYY-MM-DD từ input
        time: formData.time, // Đã là format HH:MM từ input
      };

      // Gọi API đặt lịch
      const response = await axios.post(`${API_URL}/book`, bookingData);

      // Hiển thị thông báo thành công
      setSnackbar({
        open: true,
        message: response.data.message || "Đặt lịch thành công!",
        severity: "success",
      });

      // Reset form sau khi đặt lịch thành công
      setFormData({
        customer: "",
        garage: "",
        vehicle: "",
        service: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || "Đã xảy ra lỗi khi đặt lịch.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Đóng snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Lấy ngày hiện tại ở định dạng YYYY-MM-DD để dùng làm giá trị min cho input date
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Đặt lịch dịch vụ gara
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="customer"
                label="Họ tên khách hàng"
                variant="outlined"
                fullWidth
                value={formData.customer}
                onChange={handleChange}
                error={!!errors.customer}
                helperText={errors.customer}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.garage} required>
                <InputLabel>Gara</InputLabel>
                <Select
                  name="garage"
                  value={formData.garage}
                  onChange={handleChange}
                  label="Gara"
                >
                  {garages.map((garage) => (
                    <MenuItem key={garage._id} value={garage._id}>
                      {garage.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.garage && (
                  <FormHelperText>{errors.garage}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.vehicle} required>
                <InputLabel>Xe</InputLabel>
                <Select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  label="Xe"
                >
                  {vehicles.map((vehicle) => (
                    <MenuItem key={vehicle._id} value={vehicle._id}>
                      {vehicle.licensePlate} - {vehicle.brand} {vehicle.model}
                    </MenuItem>
                  ))}
                </Select>
                {errors.vehicle && (
                  <FormHelperText>{errors.vehicle}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.service} required>
                <InputLabel>Dịch vụ</InputLabel>
                <Select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  label="Dịch vụ"
                >
                  {services.map((service) => (
                    <MenuItem key={service._id} value={service._id}>
                      {service.name} - {service.price.toLocaleString("vi-VN")}đ
                    </MenuItem>
                  ))}
                </Select>
                {errors.service && (
                  <FormHelperText>{errors.service}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="date"
                label="Ngày đặt lịch"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={formData.date}
                onChange={handleChange}
                error={!!errors.date}
                helperText={errors.date}
                required
                inputProps={{
                  min: getCurrentDate(),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="time"
                label="Giờ đặt lịch"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={formData.time}
                onChange={handleChange}
                error={!!errors.time}
                helperText={errors.time}
                required
                inputProps={{
                  step: 300, // 5 phút
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Đặt lịch ngay"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AppointmentBooking;
