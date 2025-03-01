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
import { useNavigate } from "react-router-dom";
import { primaryColor, accentColor } from "../../config/constants";


export default function Footer() {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item === "Tìm Gara") {
      navigate("/car-care/allGara");
    }
  };
  return (
    <Box sx={{ py: 6, backgroundColor: accentColor, color: primaryColor }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
              CarCare
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Đặt lịch chăm sóc xe nhanh chóng và tiện lợi tại các gara uy tín.
            </Typography>
            <Stack direction="row" spacing={2}>
              {[FaTwitter, FaFacebook, FaInstagram].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  sx={{
                    color: primaryColor,
                    "&:hover": { color: "#E6C774" },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Liên Kết Nhanh
            </Typography>
            <Stack spacing={1}>
              {["Dịch Vụ", "Tìm Gara", "Đánh Giá", "Liên Hệ"].map((item) => (
                <Typography
                  key={item}
                  component="a"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item);
                  }}
                  sx={{
                    color: primaryColor,
                    textDecoration: "none",
                    cursor: "pointer", // Đổi thành con trỏ chỉ tay khi hover
                    "&:hover": { color: "#E6C774" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Liên Hệ
            </Typography>
            <Typography variant="body2">Email: support@autobook.vn</Typography>
            <Typography variant="body2">Hotline: 1900 1234</Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ textAlign: "center", mt: 4 }}>
          © {new Date().getFullYear()} CarCare. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
