import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Facebook, Phone, Email, Chat } from "@mui/icons-material"; // Loại bỏ TikTok nếu không có
import { useNavigate } from "react-router-dom";

function HomePage({
  onLoginClick,
  onRegisterClick,
  onHistoryClick,
  onServiceClick,
  isLoggedIn,
  userType,
  username,
  onLogout,
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleGara = () => {
    navigate("/garage/dashboard");
  };

  const handleRegisterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRegisterClose = (role) => {
    setAnchorEl(null);
    if (role) onRegisterClick(role);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            CarCare
          </Typography>
          {!isLoggedIn ? (
            <>
              <Button color="inherit" onClick={onLoginClick}>
                Đăng nhập
              </Button>
              <Button color="inherit" onClick={handleRegisterClick}>
                Đăng ký
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleRegisterClose(null)}
              >
                <MenuItem onClick={() => handleRegisterClose("customer")}>
                  Đăng ký (Khách hàng)
                </MenuItem>
                <MenuItem onClick={() => handleRegisterClose("garage")}>
                  Đăng ký (Garage)
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {userType === "customer" && (
                <>
                  <Button color="inherit" onClick={onHistoryClick}>
                    Lịch sử
                  </Button>
                  <Button color="inherit" onClick={onServiceClick}>
                    Dịch vụ
                  </Button>
                </>
              )}
              <Button
                variant="garaManager"
                sx={{ mx: 2 }}
                onClick={() => handleGara()}
              >
                Quản Lý Gara
              </Button>
              <Typography variant="subtitle1" sx={{ mx: 2 }}>
                {username}
              </Typography>
              <Button color="inherit" onClick={onLogout}>
                Đăng xuất
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Body */}
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Hướng dẫn Booking Dịch vụ CarCare
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Bước 1: Đăng ký/Đăng nhập</Typography>
              <Typography>
                Tạo tài khoản hoặc đăng nhập để bắt đầu sử dụng dịch vụ.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Bước 2: Chọn Dịch vụ</Typography>
              <Typography>
                Chọn dịch vụ Spa xe hoặc Cứu hộ, nhập thông tin xe và thời gian.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Bước 3: Xác nhận Booking</Typography>
              <Typography>
                Chờ garage xác nhận và theo dõi trạng thái trong lịch sử.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "grey.900", color: "white", py: 3 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Thông tin liên hệ</Typography>
              <Typography>Địa chỉ: 123 Đường Xe Hơi, TP. HCM</Typography>
              <Typography>Số điện thoại: 0909 123 456</Typography>
              <Typography>Email: support@carcare.vn</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: "left", md: "right" } }}
            >
              <Typography variant="h6">Theo dõi chúng tôi</Typography>
              <Box>
                <IconButton
                  color="inherit"
                  href="https://facebook.com/carcare"
                  target="_blank"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  color="inherit"
                  href="https://zalo.me/carcare"
                  target="_blank"
                >
                  <Chat />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2, bgcolor: "grey.700" }} />
          <Typography align="center">
            © {new Date().getFullYear()} CarCare. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
