import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider,
  Rating,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  IconButton,
} from "@mui/material";
import {
  DirectionsCar,
  Build,
  Star,
  Phone,
  LocationOn,
  AccessTime,
  ArrowBack,
  Person,
  Info,
  Comment,
  MapsHomeWork,
  NavigateNext,
} from "@mui/icons-material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { primaryColor, accentColor } from "../../config/constants";

// Tab Panel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`garage-tabpanel-${index}`}
      aria-labelledby={`garage-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const GarageDetail = () => {
  const { garageId } = useParams();
  const navigate = useNavigate();
  const [garage, setGarage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleViewTap = () => {
    navigate("/book-appointment");
  };

  // Giả lập dữ liệu đánh giá
  const reviews = [
    {
      garageId: 1,
      user: "Nguyễn Văn A",
      avatar: "A",
      rating: 1,
      date: "15/02/2025",
      comment:
        "Dịch vụ rất tốt, nhân viên nhiệt tình, sửa xe nhanh và đúng hẹn.",
      images: [
        "https://lh3.googleusercontent.com/p/AF1QipMLhiQ5rGc6LPzat2HJh92EsjbEG6-Ff08qUD-s=s3072-w3072-h1460-rw",
        "https://lh3.googleusercontent.com/p/AF1QipMLhiQ5rGc6LPzat2HJh92EsjbEG6-Ff08qUD-s=s3072-w3072-h1460-rw",
        "https://lh3.googleusercontent.com/p/AF1QipMLhiQ5rGc6LPzat2HJh92EsjbEG6-Ff08qUD-s=s3072-w3072-h1460-rw",
      ],
    },
    {
      garageId: 2,
      user: "Trần Thị B",
      avatar: "B",
      rating: 1,
      date: "10/02/2025",
      comment: "Gara sạch sẽ, thoáng mát. Giá cả hợp lý. Sẽ quay lại lần sau.",
      images: [
        "https://lh3.googleusercontent.com/p/AF1QipMLhiQ5rGc6LPzat2HJh92EsjbEG6-Ff08qUD-s=s3072-w3072-h1460-rw",
      ],
    },
    {
      garageId: 3,
      user: "Lê Văn C",
      avatar: "C",
      rating: 1,
      date: "05/02/2025",
      comment:
        "Thợ sửa chữa chuyên nghiệp, tư vấn tận tâm. Rất hài lòng với dịch vụ.",
      images: [
        "https://lh3.googleusercontent.com/p/AF1QipMLhiQ5rGc6LPzat2HJh92EsjbEG6-Ff08qUD-s=s3072-w3072-h1460-rw",
      ],
    },
  ];

  // Giả lập dữ liệu về các hình ảnh
  const galleryImages = [
    {
      url: "https://lh3.googleusercontent.com/p/AF1QipMLhiQ5rGc6LPzat2HJh92EsjbEG6-Ff08qUD-s=s3072-w3072-h1460-rw",
      alt: "Khu vực tiếp đón",
    },
    {
      url: "https://lh3.googleusercontent.com/p/AF1QipMLhiQ5rGc6LPzat2HJh92EsjbEG6-Ff08qUD-s=s3072-w3072-h1460-rw",
      alt: "Khu vực sửa chữa",
    },
    {
      url: "https://lh3.googleusercontent.com/p/AF1QipMLhiQ5rGc6LPzat2HJh92EsjbEG6-Ff08qUD-s=s3072-w3072-h1460-rw",
      alt: "Bãi đỗ xe",
    },
  ];

  useEffect(() => {
    const fetchGarageDetail = async () => {
      try {
        setLoading(true);
        // Trong thực tế, bạn sẽ gọi API với id thực
        const response = await axios.get(
          `http://localhost:5000/api/${garageId}`
        );
        setGarage(response.data.garage);
      } catch (err) {
        setError("Không thể tải thông tin chi tiết gara");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGarageDetail();
  }, [garageId]);

  // Giả lập dữ liệu cho demo
  useEffect(() => {
    // Dữ liệu mẫu khi không có API thực
    const mockGarage = {
      _id: garageId,
      name: "Gara Xe Hơi ABC",
      owner: {
        name: "Nguyễn Văn Minh",
        phone: "0987654321",
        email: "minh@garaabc.com",
      },
      address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
      phone: "028.39123456",
      email: "contact@garaabc.com",
      website: "www.garaabc.com",
      workingHours: {
        open: "07:30",
        close: "18:00",
      },
      description:
        "Gara ABC là một trong những gara uy tín hàng đầu tại TP.HCM với hơn 10 năm kinh nghiệm trong lĩnh vực sửa chữa và bảo dưỡng xe ô tô. Chúng tôi tự hào cung cấp dịch vụ chuyên nghiệp với đội ngũ kỹ thuật viên tay nghề cao, trang thiết bị hiện đại, và cam kết mang đến sự hài lòng cho khách hàng.",
      services: [
        {
          name: "Bảo dưỡng định kỳ",
          price: 500000,
          description: "Kiểm tra tổng quát, thay dầu, lọc gió, lọc dầu...",
        },
        {
          name: "Sửa chữa động cơ",
          price: 2000000,
          description: "Kiểm tra, sửa chữa và thay thế các bộ phận động cơ",
        },
        {
          name: "Điện - Điện tử",
          price: 800000,
          description: "Kiểm tra và sửa chữa hệ thống điện trên xe",
        },
        {
          name: "Hệ thống phanh",
          price: 600000,
          description:
            "Kiểm tra, bảo dưỡng và thay thế phụ tùng hệ thống phanh",
        },
        {
          name: "Hệ thống treo",
          price: 1500000,
          description: "Kiểm tra và sửa chữa hệ thống treo, giảm xóc",
        },
        {
          name: "Điều hòa",
          price: 900000,
          description: "Bảo dưỡng, sửa chữa và nạp gas điều hòa",
        },
      ],
      facilities: [
        "Phòng chờ sang trọng",
        "WiFi miễn phí",
        "Đồ uống miễn phí",
        "Bãi đỗ xe rộng rãi",
        "Khu vực rửa xe",
      ],
      specialties: [
        "Toyota",
        "Honda",
        "Ford",
        "Hyundai",
        "Kia",
        "Mercedes-Benz",
        "BMW",
      ],
      rating: 4.8,
      totalReviews: 156,
    };

    // Set giả lập dữ liệu sau một khoảng thời gian ngắn để mô phỏng việc tải
    const timer = setTimeout(() => {
      setGarage(mockGarage);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [garageId]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Đang tải thông tin chi tiết...
        </Typography>
      </Box>
    );
  }

  if (error || !garage) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          {error || "Không tìm thấy thông tin gara"}
        </Alert>
        <Button startIcon={<ArrowBack />} onClick={handleGoBack} sx={{ mt: 2 }}>
          Quay lại
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ my: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Link color="inherit" href="/" underline="hover">
            Trang chủ
          </Link>
          <Link color="inherit" href="/car-care/allGara" underline="hover">
            Danh sách gara
          </Link>
          <Typography color="text.primary">{garage.name}</Typography>
        </Breadcrumbs>

        {/* Header với nút quay lại */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton
            onClick={handleGoBack}
            sx={{
              mr: 2,
              bgcolor: accentColor,
              color: primaryColor,
              "&:hover": {
                boxShadow: `0 8px 25px ${accentColor}60`,
                transform: "translateY(-3px)",
                bgcolor: accentColor,
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: `0 6px 20px ${accentColor}40`,
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            color="#000"
            fontWeight="bold"
          >
            {garage.name}
          </Typography>
        </Box>

        {/* Hero Section */}
        <Card elevation={4} sx={{ mb: 4, overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="300"
            image="https://www.viethungoto.com.vn/w/wp-content/uploads/2022/03/hinh-anh-dang-bai.jpg"
            alt={garage.name}
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ py: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <MapsHomeWork
                    color="#004d40"
                    sx={{ mr: 1 }}
                    fontSize="large"
                  />
                  <Typography
                    variant="h5"
                    component="h2"
                    color="#000"
                    fontWeight="medium"
                  >
                    {garage.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOn color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">{garage.address}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Person color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    <strong>Chủ gara:</strong> {garage.owner.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Phone color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    <strong>Số điện thoại:</strong> {garage.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTime color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    <strong>Giờ làm việc:</strong> {garage.workingHours.open} -{" "}
                    {garage.workingHours.close} (Hàng ngày)
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: accentColor,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Rating
                      value={garage.rating}
                      precision={0.1}
                      readOnly
                      sx={{ mr: 1 }}
                      icon={
                        <Star fontSize="large" sx={{ color: "amber.main" }} />
                      }
                      emptyIcon={
                        <Star fontSize="large" sx={{ color: primaryColor }} />
                      }
                    />
                    <Typography variant="h5" fontWeight="bold" color="white">
                      {garage.rating}/5
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                    Dựa trên {garage.totalReviews} đánh giá
                  </Typography>
                  <Button
                    onClick={() => handleViewTap()}
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 1,
                      fontWeight: "bold",
                      width: "100%",
                      bgcolor: primaryColor,
                      color: "#000",
                      "&:hover": {
                        boxShadow: `0 8px 25px ${primaryColor}60`,
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    Đặt lịch ngay
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Box sx={{ width: "100%", mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="garage details tabs"
              sx={{
                "& .MuiTab-root": {
                  fontWeight: "medium",
                  fontSize: "1rem",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: accentColor,
                },
              }}
            >
              <Tab
                icon={<Info />}
                label="Thông tin"
                id="garage-tab-0"
                sx={{
                  "&.Mui-selected": {
                    color: accentColor,
                  },
                }}
              />
              <Tab
                icon={<Build />}
                label="Dịch vụ"
                id="garage-tab-1"
                sx={{
                  "&.Mui-selected": {
                    color: accentColor,
                  },
                }}
              />
              <Tab
                icon={<DirectionsCar />}
                label="Hình ảnh"
                id="garage-tab-2"
                sx={{
                  "&.Mui-selected": {
                    color: accentColor,
                  },
                }}
              />
              <Tab
                sx={{
                  "&.Mui-selected": {
                    color: accentColor,
                  },
                }}
                icon={<Comment />}
                label="Đánh giá"
                id="garage-tab-3"
              />
            </Tabs>
          </Box>

          {/* Tab Thông tin */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom color="#000">
                  Giới thiệu
                </Typography>
                <Typography paragraph>{garage.description}</Typography>

                <Typography
                  variant="h5"
                  gutterBottom
                  color="#000"
                  sx={{ mt: 3 }}
                >
                  Chuyên xe
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                  {garage.specialties.map((specialty, index) => (
                    <Chip
                      key={index}
                      label={specialty}
                      variant="outlined"
                      size="medium"
                    />
                  ))}
                </Box>

                <Typography variant="h5" gutterBottom color="#000">
                  Tiện ích
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {garage.facilities.map((facility, index) => (
                    <Chip
                      key={index}
                      label={facility}
                      size="medium"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom color="=#000">
                      Thông tin liên hệ
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#004d40" }}>
                            <Person />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Chủ gara"
                          secondary={garage.owner.name}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#004d40" }}>
                            <Phone />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Số điện thoại"
                          secondary={garage.phone}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#004d40" }}>
                            <LocationOn />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Địa chỉ"
                          secondary={garage.address}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#004d40" }}>
                            <AccessTime />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Giờ làm việc"
                          secondary={`${garage.workingHours.open} - ${garage.workingHours.close} (Hàng ngày)`}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab Dịch vụ */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom color="#000">
              Các dịch vụ cung cấp
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: "#004d40" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Tên dịch vụ
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Mô tả
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Giá (VND)
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Hành động
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {garage.services.map((service, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography fontWeight="medium">
                          {service.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${service.price.toLocaleString()} VND`}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ color: accentColor, borderColor: accentColor }}
                        >
                          Đặt lịch
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Tab Hình ảnh */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom color="primary">
              Hình ảnh gara
            </Typography>
            <Grid container spacing={3}>
              {galleryImages.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card elevation={2}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={image.url}
                      alt={image.alt}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {image.alt}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Tab Đánh giá */}
          <TabPanel value={tabValue} index={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h5" color="#000">
                Đánh giá từ khách hàng
              </Typography>
              <Button variant="contained" sx={{ bgcolor: accentColor }}>
                Viết đánh giá
              </Button>
            </Box>

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h2"
                      fontWeight="bold"
                      color={accentColor}
                    >
                      {garage.rating}
                    </Typography>
                    <Rating
                      value={garage.rating}
                      precision={0.1}
                      readOnly
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {garage.totalReviews} đánh giá
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box>
                    {[5, 4, 3, 2, 1].map((star) => {
                      // Giả lập tỷ lệ đánh giá
                      const percentage =
                        star === 5
                          ? 65
                          : star === 4
                          ? 25
                          : star === 3
                          ? 8
                          : star === 2
                          ? 1
                          : 1;
                      return (
                        <Box
                          key={star}
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Box sx={{ minWidth: "40px" }}>
                            <Typography>{star}</Typography>
                          </Box>
                          <Star
                            color="action"
                            sx={{ mr: 1, color: "#faaf00" }}
                          />
                          <Box sx={{ width: "70%", mr: 1 }}>
                            <div
                              style={{
                                height: "8px",
                                backgroundColor: "#e0e0e0",
                                borderRadius: "4px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  width: `${percentage}%`,
                                  backgroundColor: accentColor,
                                  borderRadius: "4px",
                                }}
                              />
                            </div>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {percentage}%
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Divider sx={{ mb: 3 }} />

            {/* Danh sách đánh giá */}
            <List>
              {reviews.map((review) => (
                <React.Fragment key={review.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#004d40" }}>
                        {review.avatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="medium">
                            {review.user}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {review.date}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          <Typography
                            variant="body1"
                            color="text.primary"
                            paragraph
                          >
                            {review.comment}
                          </Typography>

                          {/* Phần hiển thị hình ảnh */}
                          {review.images?.length > 0 && (
                            <Box
                              sx={{
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                                mt: 1,
                              }}
                            >
                              {review.images.map((img, index) => (
                                <Box
                                  key={index}
                                  component="img"
                                  src={img}
                                  alt={`Feedback ${index + 1}`}
                                  sx={{
                                    maxWidth: 200,
                                    maxHeight: 200,
                                    borderRadius: 2,
                                    boxShadow: 1,
                                    cursor: "pointer",
                                    objectFit: "cover",
                                    "&:hover": {
                                      opacity: 0.9,
                                    },
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
            {reviews.length > 6 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button variant="outlined" color="primary">
                  Xem thêm đánh giá
                </Button>
              </Box>
            )}
          </TabPanel>
        </Box>
      </Container>
    </>
  );
};

export default GarageDetail;
