import React, { memo, useEffect, useState } from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { primaryColor, accentColor } from "../../config/constants";

const Header = memo(() => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Hàm xử lý đăng nhập
  const handleLogin = () => {
    navigate("/car-care/login");
  };

  // Hàm xử lý đăng ký
  const handleRegister = () => {
    navigate("/car-care/login"); // Có thể thay bằng "/car-care/register" nếu cần trang riêng
  };

  // Hàm xử lý click vào menu
  const handleClick = (item) => {
    if (item === "TÌM GARA") {
      navigate("/car-care/allGara");
    }
  };

  // Hàm mở menu dropdown
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Hàm đóng menu dropdown
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Lấy thông tin người dùng từ localStorage khi component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const userObject = JSON.parse(userData);
        setAccount(userObject);
      } catch (error) {
        console.error("Lỗi phân tích dữ liệu user:", error);
      }
    } else {
      console.log("Không tìm thấy user trong localStorage");
    }
  }, []);

  const menuItems = ["DỊCH VỤ", "TÌM GARA", "CỨU HỘ", "TIN TỨC", "LIÊN HỆ"];

  return (
    <div>
      {/* Top Bar */}
      <Box sx={{ backgroundColor: accentColor }}>
        <Container
          sx={{
            color: primaryColor,
            py: 1,
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">support@autobook.vn</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              sx={{ color: primaryColor, "&:hover": { color: accentColor } }}
            >
              <FaFacebook />
            </IconButton>
            <IconButton
              sx={{ color: primaryColor, "&:hover": { color: accentColor } }}
            >
              <FaTwitter />
            </IconButton>
            <IconButton
              sx={{ color: primaryColor, "&:hover": { color: accentColor } }}
            >
              <FaInstagram />
            </IconButton>
          </Stack>
        </Container>
      </Box>

      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: primaryColor,
          zIndex: 10,
          py: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Container>
          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent="space-between"
            alignItems="center"
            spacing={isMobile ? 2 : 0}
          >
            <Typography
              variant="h5"
              component="a"
              href="/car-care/home"
              sx={{
                fontWeight: 900,
                color: accentColor,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/logo/logo.png"
                alt="logo"
                loading="lazy"
                width="120px"
                style={{ marginRight: "10px" }}
              />
            </Typography>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={isMobile ? 1 : 4}
            >
              {menuItems.map((item) => (
                <Typography
                  key={item}
                  component="a"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item);
                  }}
                  sx={{
                    color: "#000",
                    fontWeight: 700,
                    px: 1,
                    textDecoration: "none",
                    position: "relative",
                    paddingBottom: "4px",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#004d40",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "0",
                      height: "2px",
                      backgroundColor: "#004d40",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                    transition: "color 0.3s ease",
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={isMobile ? 2 : 2}
              alignItems="center"
            >
              {localStorage.getItem("user") ? (
                <>
                  <Box
                    onClick={handleMenuOpen}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      cursor: "pointer",
                      "&:hover": { opacity: 0.8 },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "text.primary",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Chào mừng,{" "}
                      <span style={{ color: accentColor }}>
                        {account.fullName}
                      </span>
                    </Typography>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: accentColor,
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {account.fullName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        minWidth: "200px",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/car-care/profile");
                        handleMenuClose();
                      }}
                      sx={{ fontSize: "14px" }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        localStorage.removeItem("user");
                        setAccount({});
                        navigate("/car-care/home");
                        handleMenuClose();
                      }}
                      sx={{ fontSize: "14px", color: "error.main" }}
                    >
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleLogin}
                    variant="outlined"
                    sx={{
                      color: accentColor,
                      borderColor: accentColor,
                      borderRadius: "25px",
                      "&:hover": { backgroundColor: `${accentColor}20` },
                      minWidth: "120px",
                    }}
                  >
                    Đăng Nhập
                  </Button>
                  <Button
                    onClick={handleRegister}
                    variant="contained"
                    sx={{
                      backgroundColor: accentColor,
                      color: primaryColor,
                      borderRadius: "25px",
                      "&:hover": {
                        backgroundColor: "#003630",
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.3s ease",
                      minWidth: "120px",
                    }}
                  >
                    Đăng Ký
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </div>
  );
});

export default Header;
