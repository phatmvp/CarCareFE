import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { ArrowBack, CalendarToday, AccessTime } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { primaryColor, accentColor } from "../../config/constants";
import axios from "axios";
import Swal from "sweetalert2";

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
}));

const TotalBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#e8f5e9",
  padding: theme.spacing(2),
  borderRadius: 8,
  marginTop: theme.spacing(2),
}));

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // State cho thông tin đặt lịch
  const [bookingDate, setBookingDate] = React.useState("");
  const [bookingTime, setBookingTime] = React.useState("");

  if (!state) {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h6" color="error">
          Không có thông tin đặt lịch
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Quay lại
        </Button>
      </Container>
    );
  }

  const { garageId, selectedServices, garageName } = state;

  // Dữ liệu dịch vụ mẫu (trong ứng dụng thực, lấy từ API hoặc props)
  const mockServices = [
    {
      _id: "67c5ee62b6fe5d84b8dcea12",
      name: "Rửa xe",
      description: "Rửa xe sạch sẽ, làm sạch nội thất và ngoại thất.",
      price: 100000,
      duration: 30,
      category: "Bảo dưỡng",
    },
    {
      _id: "67c5ee7db6fe5d84b8dcea13",
      name: "Thay dầu máy",
      description: "Thay dầu máy và lọc dầu định kỳ.",
      price: 300000,
      duration: 45,
      category: "Bảo dưỡng",
    },
    {
      _id: "67c5ee86b6fe5d84b8dcea14",
      name: "Điện - Điện tử",
      price: 800000,
      description: "Kiểm tra và sửa chữa hệ thống điện trên xe",
    },
    {
      _id: "67c5ee8eb6fe5d84b8dcea15",
      name: "Sửa phanh",
      description: "Kiểm tra và sửa chữa hệ thống phanh.",
      price: 400000,
      duration: 90,
      category: "Sửa chữa",
      status: "Hoạt động",
    },
    {
      _id: "67c5ee95b6fe5d84b8dcea16",
      name: "Bảo dưỡng điều hòa",
      description: "Vệ sinh và bảo dưỡng hệ thống điều hòa.",
      price: 250000,
      duration: 60,
      category: "Bảo dưỡng",
      status: "Hoạt động",
    },
  ];

  const selectedServicesDetails = selectedServices.map(
    (index) => mockServices[index]
  );
  const totalPrice = selectedServicesDetails.reduce(
    (sum, service) => sum + service.price,
    0
  );

  const handleConfirm = async () => {
    if (!bookingDate || !bookingTime) {
      alert("Vui lòng chọn ngày và giờ đặt lịch!");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng đăng nhập để đặt lịch.",
        icon: "error",
        draggable: true,
      });
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
      return;
    }

    const bookingData = {
      garageId,
      services: selectedServicesDetails,
      totalPrice,
      bookingDate,
      bookingTime,
    };

    console.log("Booking data:", bookingData); // Debug dữ liệu gửi đi

    try {
      const response = await axios.post(
        "http://localhost:5000/booking",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Nếu thành công
      Swal.fire({
        title: "Đặt lịch thành công!",
        icon: "success",
        draggable: true,
      });
      navigate("/");
    } catch (error) {
      // Xử lý lỗi từ axios
      if (error.response) {
        // Lỗi từ server với mã trạng thái cụ thể
        const { status, data } = error.response;
        let errorMessage = "Có lỗi xảy ra khi đặt lịch.";

        if (status === 400) {
          errorMessage = data.message || "Dữ liệu đặt lịch không hợp lệ.";
        } else if (status === 401) {
          errorMessage = "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.";
          localStorage.removeItem("accessToken"); // Xóa token nếu hết hạn
          navigate("/login");
        } else if (status === 500) {
          errorMessage = "Lỗi server. Vui lòng thử lại sau.";
        }

        Swal.fire({
          title: "Lỗi!",
          text: errorMessage,
          icon: "error",
          draggable: true,
        });
      } else if (error.request) {
        // Lỗi không nhận được phản hồi từ server
        Swal.fire({
          title: "Lỗi!",
          text: "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.",
          icon: "error",
          draggable: true,
        });
      } else {
        Swal.fire({
          title: "Lỗi!",
          text: "Đã xảy ra lỗi không xác định: " + error.message,
          icon: "error",
          draggable: true,
        });
      }

      console.error("Error in booking:", error); // Log lỗi để debug
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link color="inherit" href="/" underline="hover">
          Trang chủ
        </Link>
        <Link color="inherit" href="/car-care/allGara" underline="hover">
          Danh sách gara
        </Link>
        <Link
          color="inherit"
          href={`/car-care/garage/${garageId}`}
          underline="hover"
        >
          {garageName}
        </Link>
        <Typography color="text.primary">Xác nhận đặt lịch</Typography>
      </Breadcrumbs>

      {/* Nút quay lại */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          color: accentColor,
          "&:hover": { bgcolor: `${accentColor}10` },
        }}
      >
        Quay lại
      </Button>

      <StyledPaper elevation={3}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, color: "#000" }}
        >
          Xác Nhận Đặt Lịch - {garageName}
        </Typography>

        <Grid container spacing={4}>
          {/* Cột bên trái: Thông tin dịch vụ */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 500, color: "#000" }}
            >
              Dịch vụ đã chọn
            </Typography>
            <List sx={{ bgcolor: "white", borderRadius: 8, p: 2 }}>
              {selectedServicesDetails.map((service, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500 }}
                        >
                          {service.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {service.description}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 500, mt: 0.5 }}
                          >
                            {service.price.toLocaleString()} VND
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < selectedServicesDetails.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>

            <TotalBox>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Tổng cộng: {totalPrice.toLocaleString()} VND
              </Typography>
            </TotalBox>
          </Grid>

          {/* Cột bên phải: Form đặt lịch */}
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 3, borderRadius: 8, height: "100%" }}>
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 500, color: "#000" }}
                >
                  Thông tin đặt lịch
                </Typography>

                <TextField
                  fullWidth
                  label="Ngày đặt lịch"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <CalendarToday sx={{ mr: 1, color: "action" }} />
                    ),
                  }}
                />

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Giờ đặt lịch</InputLabel>
                  <Select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    label="Giờ đặt lịch"
                    startAdornment={
                      <AccessTime sx={{ mr: 1, color: "action" }} />
                    }
                  >
                    {[
                      "08:00",
                      "09:00",
                      "10:00",
                      "11:00",
                      "13:00",
                      "14:00",
                      "15:00",
                      "16:00",
                      "17:00",
                    ].map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{
                      borderRadius: 8,
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontSize: "1rem",
                      flex: 1,
                    }}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleConfirm}
                    disabled={!bookingDate || !bookingTime}
                    sx={{
                      borderRadius: 8,
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontSize: "1rem",
                      backgroundColor: accentColor,
                      "&:hover": { backgroundColor: "#00695c" },
                      flex: 1,
                      boxShadow: "0 4px 12px rgba(0, 77, 64, 0.2)",
                    }}
                  >
                    Xác nhận đặt lịch
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default BookingConfirmation;
