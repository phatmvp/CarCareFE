import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import axios from "axios";

function CustomerLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (error) {
      alert(error.response?.data?.error || "Đăng nhập thất bại");
    }
  };

  const handleGarageLoginClick = () => {
    navigate("/loginGarage"); // Điều hướng sang trang đăng nhập garage
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5">Đăng nhập Khách hàng</Typography>
      <TextField
        label="Tên đăng nhập"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Mật khẩu"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Đăng nhập
      </Button>
      <Button
        variant="text"
        color="primary"
        fullWidth
        sx={{ mt: 1 }}
        onClick={handleGarageLoginClick}
      >
        Đăng nhập Garage
      </Button>
    </Box>
  );
}

export default CustomerLogin;
