import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaCar,
  FaTools,
  FaCalendarCheck,
  FaShieldAlt,
} from "react-icons/fa";
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Stack,
  Grid,
  Card,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TargetIcon from "@mui/icons-material/TrackChanges";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { primaryColor, accentColor } from "../../config/constants";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ backgroundColor: "#f5f5f7", overflowX: "hidden" }}>

      <Box
        sx={{
          position: "relative",
          minHeight: "70vh",
          backgroundImage: "url('/img/slider.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Grid container spacing={5} alignItems="start">
            <Grid item xs={12} md={5}>
              <Card
                sx={{
                  p: 4,
                  border: `27px solid #00796B`,
                  backgroundColor: primaryColor,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  marginLeft: isMobile ? "0" : "120px",
                  marginTop: isMobile ? "20px" : "0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, mb: 2, color: "#00796B" }}
                >
                  KHÁM PHÁ CARCARE
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    borderBottom: "10px solid #004d40",
                    pb: 1,
                    fontSize: isMobile ? "2rem" : "3rem",
                  }}
                >
                  Giải Pháp Tối Ưu Cho Chăm Sóc Xe Của Bạn
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: "#757575" }}>
                  CarCare kết nối bạn trực tiếp với các gara ô tô đáng tin cậy,
                  giúp bạn dễ dàng đặt lịch cho các dịch vụ cần thiết cho xe của
                  mình. Cần hỗ trợ trên đường? Nền tảng của chúng tôi cung cấp
                  quyền truy cập tức thì vào dịch vụ khẩn cấp và giúp bạn tìm
                  các gara gần nhất để có trải nghiệm liền mạch.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: accentColor,
                    color: primaryColor,
                    borderRadius: "30px",
                    px: 5,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#003630",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Đặt Lịch Ngay
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Service Cards */}
      <Box sx={{ py: 10, backgroundColor: "#f5f5f5" }}>
        <Container>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, textAlign: "center", mb: 6 }}
          >
            Đặt Lịch Nhanh
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: <FaTools />, title: "Bảo Dưỡng" },
              { icon: <FaShieldAlt />, title: "Sửa Chữa" },
              { icon: <FaCar />, title: "Chăm Sóc" },
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box sx={{ color: accentColor, fontSize: "3rem", mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: accentColor,
                      color: accentColor,
                      borderRadius: "20px",
                      "&:hover": { backgroundColor: `${accentColor}20` },
                    }}
                  >
                    Đặt Ngay
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: primaryColor }}>
        <Box sx={{ mx: { xs: 2, md: 13 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative", p: 4 }}>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    zIndex: 0,
                    height: "80%",
                    width: "80%",
                    backgroundColor: accentColor,
                  }}
                />
                <Box
                  component="img"
                  src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/f91cc434-facb-4d53-a5f2-636e193e7e00/publicContain"
                  alt="CarCare"
                  sx={{
                    position: "relative",
                    marginLeft: { xs: 0, md: 14 },
                    bottom: { xs: 0, md: 40 },
                    right: { xs: 0, md: 40 },
                    zIndex: 1,
                    width: "90%",
                    height: { xs: "300px", md: "550px" },
                    objectFit: "cover",
                  }}
                />
                <Paper
                  elevation={0}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    zIndex: 2,
                    height: { xs: "150px", md: "250px" },
                    width: { xs: "200px", md: "300px" },
                    backgroundColor: "#00796B",
                    p: 3,
                    borderTop: "15px solid rgb(255, 255, 255)",
                    borderLeft: "15px solid rgb(255, 255, 255)",
                    borderRadius: "0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      color: "common.white",
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                      1,000+
                    </Typography>
                    <Typography variant="body1">Khách hàng hài lòng</Typography>
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ px: { xs: 2, md: 4 }, mx: { xs: 0, md: 4 } }}>
                <Typography
                  variant="overline"
                  sx={{
                    display: "block",
                    fontWeight: "600",
                    color: accentColor,
                    mb: 2,
                  }}
                >
                  Khám phá CarCare
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                    borderBottom: "8px solid",
                    borderColor: accentColor,
                    mb: 4,
                    fontSize: { xs: "2rem", md: "3rem" },
                  }}
                >
                  Dịch vụ chăm sóc xe tiện lợi trong tầm tay của bạn
                </Typography>
                <Typography variant="body1" sx={{ color: "#757575", mb: 4 }}>
                  CarCare giúp bạn dễ dàng đặt lịch hẹn tại các gara ô tô chỉ
                  với vài cú nhấp chuột. Nền tảng của chúng tôi không chỉ kết
                  nối bạn với những đơn vị uy tín mà còn hỗ trợ tìm kiếm gara
                  gần nhất và dịch vụ cứu hộ khẩn cấp, đảm bảo chiếc xe của bạn
                  luôn được chăm sóc chu đáo.
                </Typography>
                <Grid container spacing={4} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        textAlign: "start",
                      }}
                    >
                      <Box
                        sx={{
                          width: 66,
                          height: 66,
                          borderRadius: "50%",
                          backgroundColor: "#00796B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: primaryColor,
                          mb: 2,
                        }}
                      >
                        <TargetIcon style={{ fontSize: 40 }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        Cam kết của chúng tôi
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Chúng tôi đảm bảo kết nối liền mạch giữa bạn và những
                        dịch vụ chăm sóc xe tốt nhất.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        textAlign: "start",
                      }}
                    >
                      <Box
                        sx={{
                          width: 66,
                          height: 66,
                          borderRadius: "50%",
                          backgroundColor: "#00796B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: primaryColor,
                          mb: 2,
                        }}
                      >
                        <VisibilityIcon style={{ fontSize: 40 }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        Tầm nhìn của chúng tôi
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Chúng tôi hướng đến việc giúp mọi người dễ dàng tiếp cận
                        các dịch vụ bảo dưỡng xe mà không gặp rắc rối.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    px: 4,
                    py: 2,
                    backgroundColor: accentColor,
                  }}
                >
                  Nhận hỗ trợ ngay
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Why Choose CarCare */}
      <Box sx={{ py: 10, backgroundColor: "#f5f5f7" }}>
        <Container>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, textAlign: "center", mb: 6 }}
          >
            Tại Sao Chọn CarCare?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <FaCalendarCheck />,
                title: "Đặt Lịch Dễ Dàng",
                desc: "Chọn gara và thời gian chỉ trong 3 bước.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Uy Tín Đảm Bảo",
                desc: "Hợp tác với các gara được đánh giá cao.",
              },
              {
                icon: <FaCar />,
                title: "Dịch Vụ Đa Dạng",
                desc: "Từ bảo dưỡng đến chăm sóc xe toàn diện.",
              },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ color: accentColor, fontSize: "2.5rem" }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};

export default HomePage;
