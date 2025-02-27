import React from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaCar, FaTools, FaCalendarCheck, FaShieldAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const HomePage = () => {
  const primaryColor = "#1A2526"; // Deep charcoal gray
  const accentColor = "#D4AF37"; // Luxurious gold
  const gradientDark = "#2E3B55"; // Midnight blue-gray
  const imgCare =
    "https://thanhphongauto.com/wp-content/uploads/2020/04/Lamborghini.jpg"; // Car garage background image

  return (
    <Box sx={{ backgroundColor: "#f5f5f7" }}>
      {/* Hero Section with Background */}
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${imgCare})`,
            backgroundSize: "cover",
            backgroundPosition: "center",

            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, ${primaryColor}90 0%, ${gradientDark}90 100%)`,
            opacity: 0.7,
            zIndex: 0,
          },
        }}
      >
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 2,
          }}
        >
          <Container>
            <Typography
              variant="h5"
              component="a"
              href="#"
              sx={{
                fontWeight: 800,
                color: accentColor,
                textDecoration: "none",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                flexGrow: 1,
                transition: "color 0.3s ease",
                "&:hover": { color: "#E6C774" },
              }}
            >
              <FaCar style={{ marginRight: "8px" }} />
              AutoBook
            </Typography>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <Stack
                direction="row"
                spacing={4}
                sx={{
                  flexGrow: 1,
                  justifyContent: "center",
                  display: { xs: "none", md: "flex" },
                }}
              >
                {[
                  "Trang Chủ",
                  "Dịch Vụ",
                  "Đối Tác Gara",
                  "Đánh Giá",
                  "Liên Hệ",
                ].map((item) => (
                  <Typography
                    key={item}
                    component="a"
                    href="#"
                    sx={{
                      color: item === "Trang Chủ" ? accentColor : "#D1D5DB",
                      fontWeight: 600,
                      textDecoration: "none",
                      fontSize: "1rem",
                      "&:hover": { color: "#E6C774", transform: "scale(1.1)" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    borderRadius: "50px",
                    textTransform: "none",
                    "&:hover": { borderColor: accentColor, color: accentColor },
                  }}
                >
                  Đăng Nhập
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: accentColor,
                    color: primaryColor,
                    borderRadius: "50px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#E6C774" },
                  }}
                >
                  Đăng Ký
                </Button>
              </Stack>
            </div>
          </Container>
        </nav>

        {/* Hero Content */}
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                color: "#F5F5F5",
                lineHeight: 1.1,
                mb: 3,
                fontSize: { xs: "2.5rem", sm: "4rem", md: "5rem" },
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              AutoBook
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: accentColor,
                mb: 4,
                fontSize: { xs: "1.2rem", sm: "1.8rem", md: "2.5rem" },
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              Đặt Lịch Chăm Sóc Xe Thông Minh
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#D1D5DB",
                opacity: 0.9,
                mb: 5,
                maxWidth: "700px",
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.25rem" },
                lineHeight: 1.6,
              }}
            >
              Kết nối với hơn 500+ gara uy tín trên toàn quốc. Đặt lịch nhanh
              chóng, theo dõi quá trình bảo dưỡng, và tận hưởng trải nghiệm chăm
              sóc xe chuyên nghiệp.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: accentColor,
                  color: primaryColor,
                  fontWeight: 700,
                  py: { xs: 1.5, md: 2 },
                  px: { xs: 4, md: 6 },
                  borderRadius: "50px",
                  textTransform: "none",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  boxShadow: `0 8px 20px ${accentColor}60`,
                  "&:hover": {
                    backgroundColor: "#E6C774",
                    transform: "scale(1.05)",
                    boxShadow: `0 12px 30px ${accentColor}80`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Đặt Lịch Ngay
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  fontWeight: 600,
                  py: { xs: 1.5, md: 2 },
                  px: { xs: 4, md: 6 },
                  borderRadius: "50px",
                  textTransform: "none",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Tìm Gara Gần Đây
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 10, backgroundColor: "#fff" }}>
        <Container>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: primaryColor,
              textAlign: "center",
              mb: 2,
            }}
          >
            Dịch Vụ Của Chúng Tôi
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              textAlign: "center",
              mb: 8,
              maxWidth: "700px",
              mx: "auto",
              fontSize: "1.1rem",
            }}
          >
            AutoBook kết nối bạn với các dịch vụ chăm sóc xe chất lượng cao từ
            những gara uy tín nhất
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <FaTools size={40} />,
                title: "Bảo Dưỡng Định Kỳ",
                desc: "Đặt lịch bảo dưỡng định kỳ theo khuyến cáo của nhà sản xuất với các gara chuyên nghiệp.",
              },
              {
                icon: <FaShieldAlt size={40} />,
                title: "Sửa Chữa & Bảo Hành",
                desc: "Dịch vụ sửa chữa toàn diện với cam kết bảo hành rõ ràng từ các đối tác của chúng tôi.",
              },
              {
                icon: <FaCar size={40} />,
                title: "Chăm Sóc Xe Cao Cấp",
                desc: "Dịch vụ rửa xe, đánh bóng, phủ ceramic và làm đẹp nội thất từ các chuyên gia hàng đầu.",
              },
              {
                icon: <FaCalendarCheck size={40} />,
                title: "Lịch Nhắc Thông Minh",
                desc: "Hệ thống nhắc lịch bảo dưỡng thông minh giúp bạn không bỏ lỡ kỳ bảo dưỡng nào.",
              },
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 4 }}>
                    <Box sx={{ color: accentColor, mb: 2 }}>{service.icon}</Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, mb: 2, color: primaryColor }}
                    >
                      {service.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {service.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 10, backgroundColor: "#f5f5f7" }}>
        <Container>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: primaryColor,
              textAlign: "center",
              mb: 2,
            }}
          >
            Cách Thức Hoạt Động
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              textAlign: "center",
              mb: 8,
              maxWidth: "700px",
              mx: "auto",
              fontSize: "1.1rem",
            }}
          >
            Chỉ với 3 bước đơn giản, xe của bạn sẽ được chăm sóc bởi những
            chuyên gia hàng đầu
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                step: "01",
                title: "Chọn Dịch Vụ & Gara",
                desc: "Lựa chọn dịch vụ bạn cần và tìm gara phù hợp theo vị trí, đánh giá và giá cả.",
              },
              {
                step: "02",
                title: "Đặt Lịch Thông Minh",
                desc: "Chọn ngày giờ phù hợp và xác nhận đặt lịch. Bạn sẽ nhận được xác nhận ngay tức thì.",
              },
              {
                step: "03",
                title: "Nhận Dịch Vụ & Đánh Giá",
                desc: "Mang xe đến gara theo lịch hẹn, nhận dịch vụ chất lượng và để lại đánh giá.",
              },
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: "20px",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-10px)" },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      color: `${accentColor}20`,
                      mb: 2,
                      fontSize: "5rem",
                    }}
                  >
                    {step.step}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: 2, color: primaryColor }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#666" }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: accentColor,
                color: primaryColor,
                fontWeight: 700,
                py: 2,
                px: 6,
                borderRadius: "50px",
                textTransform: "none",
                fontSize: "1.2rem",
                boxShadow: `0 8px 20px ${accentColor}60`,
                "&:hover": {
                  backgroundColor: "#E6C774",
                  transform: "scale(1.05)",
                  boxShadow: `0 12px 30px ${accentColor}80`,
                },
                transition: "all 0.3s ease",
              }}
            >
              Tìm Hiểu Thêm
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, backgroundColor: primaryColor }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: accentColor, mb: 3 }}
              >
                <FaCar style={{ marginRight: "8px" }} />
                AutoBook
              </Typography>
              <Typography variant="body2" sx={{ color: "#D1D5DB", mb: 3 }}>
                Nền tảng đặt lịch chăm sóc xe hàng đầu, kết nối khách hàng với
                các gara uy tín trên toàn quốc.
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  sx={{ color: accentColor, "&:hover": { color: "#E6C774" } }}
                >
                  <FaTwitter />
                </IconButton>
                <IconButton
                  sx={{ color: accentColor, "&:hover": { color: "#E6C774" } }}
                >
                  <FaFacebook />
                </IconButton>
                <IconButton
                  sx={{ color: accentColor, "&:hover": { color: "#E6C774" } }}
                >
                  <FaInstagram />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#fff", mb: 3 }}
              >
                Dịch Vụ
              </Typography>
              <Stack spacing={1}>
                {[
                  "Bảo dưỡng định kỳ",
                  "Sửa chữa & Bảo hành",
                  "Chăm sóc xe",
                  "Phụ tùng chính hãng",
                ].map((item) => (
                  <Typography
                    key={item}
                    component="a"
                    href="#"
                    sx={{
                      color: "#D1D5DB",
                      textDecoration: "none",
                      "&:hover": { color: accentColor },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#fff", mb: 3 }}
              >
                Công Ty
              </Typography>
              <Stack spacing={1}>
                {[
                  "Về chúng tôi",
                  "Đối tác gara",
                  "Blog",
                  "Liên hệ",
                  "Tuyển dụng",
                ].map((item) => (
                  <Typography
                    key={item}
                    component="a"
                    href="#"
                    sx={{
                      color: "#D1D5DB",
                      textDecoration: "none",
                      "&:hover": { color: accentColor },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#fff", mb: 3 }}
              >
                Liên Hệ
              </Typography>
              <Typography variant="body2" sx={{ color: "#D1D5DB", mb: 1 }}>
                Email: info@autobook.vn
              </Typography>
              <Typography variant="body2" sx={{ color: "#D1D5DB", mb: 1 }}>
                Hotline: 1900 1234
              </Typography>
              <Typography variant="body2" sx={{ color: "#D1D5DB", mb: 3 }}>
                Địa chỉ: 123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  borderRadius: "50px",
                  textTransform: "none",
                  "&:hover": { borderColor: accentColor, color: accentColor },
                }}
              >
                Liên Hệ Ngay
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: "1px solid #333",
              mt: 4,
              pt: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "#D1D5DB" }}>
              © {new Date().getFullYear()} AutoBook. Tất cả quyền được bảo lưu.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
