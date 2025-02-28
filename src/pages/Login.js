import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  Box,
  Paper,
  Link,
  Fade,
  Grid,
  Tabs,
  Tab,
  Divider,
  IconButton,
  Chip,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SpeedIcon from "@mui/icons-material/Speed";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function PremiumBookingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: "success",
    message: "",
  });

  const primaryColor = "#1A2526";
  const accentColor = "#D4AF37";
  const gradientDark = "#2E3B55";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (event) => {
    if (tabValue === 1 && password !== confirmPassword) {
      setAlert({
        show: true,
        severity: "error",
        message: "Mật khẩu xác nhận không khớp",
      });
      return;
    }

    setLoading(true);

    try {
      if (tabValue === 0) {
        // Xử lý đăng nhập
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data.error || "Đăng nhập thất bại");
        }

        // Lưu token và thông tin người dùng
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setAlert({
          show: true,
          severity: "success",
          message: "Đăng nhập thành công!",
        });
        event.preventDefault();
        // // Chuyển hướng sau khi đăng nhập thành công
        // setTimeout(() => {
        //   window.location.href = "/car-care/login/#";
        // }, 1500);
      } else {
        // Xử lý đăng ký
        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fullName, phone, email, password }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Đăng ký thất bại");
        }

        setAlert({
          show: true,
          severity: "success",
          message: "Đăng ký thành công! Vui lòng đăng nhập.",
        });

        // Chuyển sang tab đăng nhập sau khi đăng ký thành công
        setTimeout(() => {
          setTabValue(0);
          setFullName("");
          setPhone("");
          setPassword("");
          setConfirmPassword("");
        }, 1500);
      }
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${gradientDark} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          backgroundImage: `radial-gradient(circle, ${accentColor}20 1px, transparent 1px)`,
          backgroundSize: { xs: "20px 20px", md: "30px 30px" },
          transform: "rotate(15deg)",
          opacity: 0.2,
        },
      }}
    >
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              borderRadius: { xs: 4, md: 6 },
              backgroundColor: "rgba(26, 37, 38, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: `0 30px 70px rgba(0, 0, 0, 0.5), 0 10px 20px ${primaryColor}40`,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "5px",
                background: `linear-gradient(90deg, ${accentColor} 0%, ${gradientDark} 100%)`,
              },
            }}
          >
            <Grid container direction={{ xs: "column", md: "row" }}>
              {/* Left side - Features (Hidden on mobile) */}
              <Grid
                item
                xs={12}
                md={7}
                sx={{
                  display: { xs: "none", md: "flex" }, // Ẩn trên mobile
                  background: `linear-gradient(135deg, ${primaryColor} 0%, ${gradientDark} 100%)`,
                  p: { sm: 4, md: 6 },
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  color: "#F5F5F5",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: "url(/api/placeholder/800/1000)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.05,
                    zIndex: 0,
                  },
                  borderTopLeftRadius: { md: 6 },
                  borderBottomLeftRadius: { md: 6 },
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: { xs: 2, md: 3 },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: accentColor,
                        width: { xs: 48, md: 60 }, // Smaller avatar on mobile
                        height: { xs: 48, md: 60 },
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                        mr: 2,
                      }}
                    >
                      <DirectionsCarIcon
                        sx={{
                          fontSize: { xs: "1.5rem", md: "2rem" },
                          color: primaryColor,
                        }}
                      />
                    </Avatar>
                    <Typography
                      component="h1"
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        letterSpacing: "-0.5px",
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        color: accentColor,
                        fontSize: { xs: "2rem", md: "3rem" }, // Smaller title on mobile
                      }}
                    >
                      CarCare
                    </Typography>
                  </Box>

                  <Chip
                    label="HỆ THỐNG ĐẶT LỊCH"
                    sx={{
                      bgcolor: accentColor,
                      color: primaryColor,
                      fontWeight: 700,
                      mb: 2,
                      px: 1,
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
                      "& .MuiChip-label": { px: 1 },
                    }}
                  />

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      letterSpacing: "-0.5px",
                      fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.5rem" },
                      color: "#F5F5F5",
                    }}
                  >
                    Đặt lịch gara ô tô
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: { xs: 2, md: 3 },
                      color: accentColor,
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                      fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.5rem" },
                    }}
                  >
                    Dễ dàng & Tiện lợi
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: { xs: 3, md: 4 },
                      fontSize: { xs: "0.9rem", md: "1.1rem" },
                      lineHeight: 1.6,
                      opacity: 0.85,
                      maxWidth: "90%",
                      color: "#D1D5DB",
                    }}
                  >
                    Kết nối với hàng trăm gara uy tín trên toàn quốc, giúp bạn
                    dễ dàng đặt lịch bảo dưỡng, sửa chữa hoặc chăm sóc xe chỉ
                    trong vài bước.
                  </Typography>

                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    sx={{ mb: { xs: 3, md: 4 } }}
                  >
                    <Grid item xs={6} sm={6}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: accentColor,
                            mr: 1.5,
                            width: { xs: 36, md: 40 },
                            height: { xs: 36, md: 40 },
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          }}
                        >
                          <SpeedIcon
                            sx={{
                              color: primaryColor,
                              fontSize: { xs: "1.2rem", md: "1.5rem" },
                            }}
                          />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1.1rem" },
                            }}
                          >
                            Đặt lịch nhanh chóng
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: accentColor,
                            mr: 1.5,
                            width: { xs: 36, md: 40 },
                            height: { xs: 36, md: 40 },
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          }}
                        >
                          <CleaningServicesIcon
                            sx={{
                              color: primaryColor,
                              fontSize: { xs: "1.2rem", md: "1.5rem" },
                            }}
                          />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1.1rem" },
                            }}
                          >
                            Nhiều dịch vụ đa dạng
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: accentColor,
                            mr: 1.5,
                            width: { xs: 36, md: 40 },
                            height: { xs: 36, md: 40 },
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              color: primaryColor,
                              fontSize: { xs: "1.2rem", md: "1.5rem" },
                            }}
                          />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1.1rem" },
                            }}
                          >
                            Gara uy tín
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: accentColor,
                            mr: 1.5,
                            width: { xs: 36, md: 40 },
                            height: { xs: 36, md: 40 },
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          }}
                        >
                          <LocalOfferIcon
                            sx={{
                              color: primaryColor,
                              fontSize: { xs: "1.2rem", md: "1.5rem" },
                            }}
                          />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1.1rem" },
                            }}
                          >
                            So sánh giá cả
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexWrap: "wrap",
                      mt: 2,
                      justifyContent: { xs: "center", md: "flex-start" },
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        py: { xs: 1.2, md: 1.8 },
                        px: { xs: 3, md: 4 },
                        borderRadius: "50px",
                        backgroundColor: accentColor,
                        color: primaryColor,
                        fontWeight: 700,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#E6C774",
                          transform: "translateY(-3px)",
                          boxShadow: `0 10px 25px ${accentColor}80`,
                        },
                        transition: "all 0.3s ease",
                        boxShadow: `0 6px 15px ${accentColor}60`,
                      }}
                    >
                      Tìm gara gần bạn
                    </Button>

                    <Button
                      variant="outlined"
                      sx={{
                        py: { xs: 1.2, md: 1.8 },
                        px: { xs: 3, md: 4 },
                        borderRadius: "50px",
                        borderColor: accentColor,
                        color: accentColor,
                        borderWidth: 2,
                        fontWeight: 600,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#E6C774",
                          color: "#E6C774",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          transform: "translateY(-3px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Xem tất cả dịch vụ
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Right side - Login/Register form */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  p: { xs: 3, sm: 4, md: 5 },
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(26, 37, 38, 0.98)",
                  borderRadius: { xs: 4, md: 6 },
                  borderTopLeftRadius: { xs: 4, md: 0 },
                  borderTopRightRadius: { xs: 4, md: 6 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: accentColor,
                      textAlign: "center",
                      fontSize: { xs: "1.5rem", md: "2rem" },
                    }}
                  >
                    Chào mừng đến CarCare
                  </Typography>

                  <Typography
                    variant="body1"
                    color="#D1D5DB"
                    align="center"
                    sx={{
                      mb: { xs: 3, md: 4 },
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    {tabValue === 0
                      ? "Đăng nhập để tìm gara và đặt lịch"
                      : "Đăng ký để bắt đầu sử dụng dịch vụ"}
                  </Typography>

                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{
                      mb: { xs: 3, md: 4 },
                      "& .MuiTabs-indicator": {
                        backgroundColor: accentColor,
                        height: 3,
                        borderRadius: "3px",
                      },
                      "& .MuiTab-root": {
                        fontWeight: 600,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        textTransform: "none",
                        color: "#9CA3AF",
                        "&.Mui-selected": {
                          color: accentColor,
                        },
                      },
                    }}
                  >
                    <Tab label="Đăng Nhập" />
                    <Tab label="Đăng Ký" />
                  </Tabs>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: "100%" }}
                  >
                    {tabValue === 0 ? (
                      // Form Đăng Nhập
                      <>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Địa chỉ Email"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon
                                  sx={{
                                    color: accentColor,
                                    opacity: 0.8,
                                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: accentColor,
                                  borderWidth: 2,
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: accentColor,
                              },
                              py: { xs: 0.3, md: 0.5 },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#9CA3AF",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused": { color: accentColor },
                            },
                            mb: 2,
                          }}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Mật khẩu"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockOutlinedIcon
                                  sx={{
                                    color: accentColor,
                                    opacity: 0.8,
                                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={togglePasswordVisibility}
                                  edge="end"
                                  sx={{ color: accentColor, opacity: 0.8 }}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: accentColor,
                                  borderWidth: 2,
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: accentColor,
                              },
                              py: { xs: 0.3, md: 0.5 },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#9CA3AF",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused": { color: accentColor },
                            },
                          }}
                        />
                      </>
                    ) : (
                      // Form Đăng Ký
                      <>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="fullName"
                          label="Họ và tên"
                          name="fullName"
                          autoComplete="name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon
                                  sx={{
                                    color: accentColor,
                                    opacity: 0.8,
                                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: accentColor,
                                  borderWidth: 2,
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: accentColor,
                              },
                              py: { xs: 0.3, md: 0.5 },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#9CA3AF",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused": { color: accentColor },
                            },
                            mb: 2,
                          }}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="phone"
                          label="Số điện thoại"
                          name="phone"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon
                                  sx={{
                                    color: accentColor,
                                    opacity: 0.8,
                                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: accentColor,
                                  borderWidth: 2,
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: accentColor,
                              },
                              py: { xs: 0.3, md: 0.5 },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#9CA3AF",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused": { color: accentColor },
                            },
                            mb: 2,
                          }}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Địa chỉ Email"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon
                                  sx={{
                                    color: accentColor,
                                    opacity: 0.8,
                                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: accentColor,
                                  borderWidth: 2,
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: accentColor,
                              },
                              py: { xs: 0.3, md: 0.5 },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#9CA3AF",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused": { color: accentColor },
                            },
                            mb: 2,
                          }}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Mật khẩu"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockOutlinedIcon
                                  sx={{
                                    color: accentColor,
                                    opacity: 0.8,
                                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={togglePasswordVisibility}
                                  edge="end"
                                  sx={{ color: accentColor, opacity: 0.8 }}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: accentColor,
                                  borderWidth: 2,
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: accentColor,
                              },
                              py: { xs: 0.3, md: 0.5 },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#9CA3AF",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused": { color: accentColor },
                            },
                            mb: 2,
                          }}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="confirmPassword"
                          label="Xác nhận mật khẩu"
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockOutlinedIcon
                                  sx={{
                                    color: accentColor,
                                    opacity: 0.8,
                                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle confirm password visibility"
                                  onClick={toggleConfirmPasswordVisibility}
                                  edge="end"
                                  sx={{ color: accentColor, opacity: 0.8 }}
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              color: "#F5F5F5",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: accentColor,
                                  borderWidth: 2,
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: accentColor,
                              },
                              py: { xs: 0.3, md: 0.5 },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#9CA3AF",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              "&.Mui-focused": { color: accentColor },
                            },
                          }}
                        />
                      </>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 1,
                        mb: 3,
                      }}
                    >
                      <Link
                        href="#"
                        variant="body2"
                        sx={{
                          color: accentColor,
                          fontWeight: 500,
                          fontSize: { xs: "0.8rem", md: "0.875rem" },
                          "&:hover": {
                            color: "#E6C774",
                            textDecoration: "none",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        Quên mật khẩu?
                      </Link>
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        py: { xs: 1.2, md: 1.8 },
                        borderRadius: "15px",
                        background: `linear-gradient(45deg, ${accentColor} 100%, ${gradientDark} 100%)`,
                        color: primaryColor,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 600,
                        textTransform: "none",
                        letterSpacing: "0.5px",
                        "&:hover": {
                          boxShadow: `0 8px 25px ${accentColor}60`,
                          transform: "translateY(-3px)",
                        },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: `0 6px 20px ${accentColor}40`,
                      }}
                    >
                      {tabValue === 0 ? "Đăng nhập" : "Đăng ký"}
                    </Button>

                    <Divider
                      sx={{
                        my: { xs: 2, md: 3 },
                        color: "#9CA3AF",
                        fontSize: { xs: "0.8rem", md: "0.9rem" },
                      }}
                    >
                      Hoặc tiếp tục với
                    </Divider>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: { xs: 2, md: 3 },
                        mt: 2,
                        flexWrap: { xs: "wrap", sm: "nowrap" },
                      }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        sx={{
                          borderRadius: "10px",
                          borderColor: "#DB4437",
                          color: "#F5F5F5",
                          px: { xs: 2, md: 3 },
                          py: 1.2,
                          fontSize: { xs: "0.8rem", md: "0.875rem" },
                          "&:hover": {
                            bgcolor: "rgba(219, 68, 55, 0.1)",
                            borderColor: "#DB4437",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        Google
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<FacebookIcon />}
                        sx={{
                          borderRadius: "10px",
                          borderColor: "#1877F2",
                          color: "#F5F5F5",
                          px: { xs: 2, md: 3 },
                          py: 1.2,
                          fontSize: { xs: "0.8rem", md: "0.875rem" },
                          "&:hover": {
                            bgcolor: "rgba(24, 119, 242, 0.1)",
                            borderColor: "#1877F2",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        Facebook
                      </Button>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: { xs: 3, md: 4 },
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="#9CA3AF"
                        sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
                      >
                        {tabValue === 0
                          ? "Chưa có tài khoản?"
                          : "Đã có tài khoản?"}
                      </Typography>
                      <Link
                        href="#"
                        variant="body2"
                        onClick={(e) => {
                          e.preventDefault();
                          setTabValue(tabValue === 0 ? 1 : 0);
                        }}
                        sx={{
                          color: accentColor,
                          fontWeight: 600,
                          fontSize: { xs: "0.8rem", md: "0.875rem" },
                          "&:hover": {
                            color: "#E6C774",
                            textDecoration: "none",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {tabValue === 0 ? "Đăng ký ngay" : "Đăng nhập"}
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default PremiumBookingPage;
