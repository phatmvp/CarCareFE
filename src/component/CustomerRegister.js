import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

function CustomerRegister({ onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          password,
          role: "customer", // Đăng ký mặc định là khách hàng
        }
      );
      alert(response.data.message); // Hiển thị thông báo thành công
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      onBack(); // Quay lại màn hình đăng nhập
    } catch (err) {
      setError(err.response?.data?.error || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Đăng ký Khách hàng
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Tên đăng nhập"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          label="Mật khẩu"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          label="Xác nhận mật khẩu"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />
        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={onBack}
          disabled={loading}
        >
          Quay lại
        </Button>
      </Box>
    </Paper>
  );
}

export default CustomerRegister;
