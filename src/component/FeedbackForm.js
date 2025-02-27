import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";

function FeedbackForm({ setView, bookingId }) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!feedback.trim()) {
      setError("Vui lòng nhập feedback");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/bookings/${bookingId}/feedback`,
        { feedback },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      alert(response.data.message); // "Gửi feedback thành công"
      setFeedback("");
      setView("history"); // Quay lại màn hình lịch sử sau khi gửi feedback
    } catch (err) {
      setError(err.response?.data?.error || "Không thể gửi feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Gửi Feedback
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nhập ý kiến của bạn"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          disabled={loading}
          placeholder="Chia sẻ cảm nhận của bạn về dịch vụ..."
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
          {loading ? "Đang gửi..." : "Gửi Feedback"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => setView("history")}
          disabled={loading}
        >
          Quay lại
        </Button>
      </Box>
    </Paper>
  );
}

export default FeedbackForm;
