import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Snackbar,
  Alert,
  Grid,
  IconButton,
  Divider,
  Card,
  CardContent,
  CardActions,
  Badge,
  Avatar,
  Tooltip,
  LinearProgress,
  Breadcrumbs,
  Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  DateRange as DateRangeIcon,
  AccessTime as TimeIcon,
  DirectionsCar as CarIcon,
  Person as PersonIcon,
  Build as BuildIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// API URL
const API_URL = "http://localhost:5000/appointment";

// Styled components
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const StatusAvatar = styled(Avatar)(({ theme, statuscolor }) => ({
  backgroundColor: statuscolor,
  width: 38,
  height: 38,
  marginRight: theme.spacing(2),
}));

const AppointmentCard = styled(Card)(({ theme, status }) => ({
  marginBottom: theme.spacing(2),
  transition: "transform 0.3s, box-shadow 0.3s",
  borderLeft: `5px solid ${
    status === "confirmed"
      ? theme.palette.primary.main
      : status === "completed"
      ? theme.palette.success.main
      : status === "cancelled"
      ? theme.palette.error.main
      : theme.palette.warning.main
  }`,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const GarageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/appointments`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách lịch hẹn:", error);
      setSnackbar({
        open: true,
        message: "Không thể tải danh sách lịch hẹn",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setStatus(appointment.status);
    setReason(appointment.reason || "");
    setOpenDialog(true);
  };

  const handleUpdateStatus = async () => {
    if (status === "cancelled" && !reason.trim()) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập lý do khi hủy lịch hẹn!",
        severity: "warning",
      });
      return;
    }

    try {
      await axios.put(
        `${API_URL}/appointment/${selectedAppointment._id}/status`,
        {
          status,
          reason: status === "cancelled" ? reason : null,
        }
      );

      fetchAppointments();
      setOpenDialog(false);
      setReason("");

      const statusMessages = {
        confirmed: "Lịch hẹn đã được xác nhận",
        completed: "Lịch hẹn đã được đánh dấu hoàn thành",
        cancelled: "Lịch hẹn đã được hủy",
        pending: "Lịch hẹn đã được cập nhật sang trạng thái chờ xác nhận",
      };

      setSnackbar({
        open: true,
        message: statusMessages[status] || "Cập nhật trạng thái thành công",
        severity: "success",
      });
    } catch (error) {
      console.error("Lỗi cập nhật lịch hẹn:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || "Lỗi khi cập nhật trạng thái",
        severity: "error",
      });
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch hẹn này không?")) {
      try {
        await axios.delete(`${API_URL}/appointment/${id}`);
        fetchAppointments();
        setSnackbar({
          open: true,
          message: "Xóa lịch hẹn thành công!",
          severity: "success",
        });
      } catch (error) {
        console.error("Lỗi khi xóa lịch hẹn:", error);
        setSnackbar({
          open: true,
          message: error.response?.data?.error || "Lỗi khi xóa lịch hẹn",
          severity: "error",
        });
      }
    }
  };

  const getStatusInfo = (status) => {
    const statusInfo = {
      pending: {
        label: "Chờ duyệt",
        color: "warning.main",
        icon: <TimeIcon />,
        avatarColor: "#FFA726",
      },
      confirmed: {
        label: "Đã xác nhận",
        color: "primary.main",
        icon: <CheckCircleIcon />,
        avatarColor: "#1976D2",
      },
      completed: {
        label: "Đã hoàn thành",
        color: "success.main",
        icon: <CheckCircleIcon />,
        avatarColor: "#2E7D32",
      },
      cancelled: {
        label: "Đã hủy",
        color: "error.main",
        icon: <CancelIcon />,
        avatarColor: "#D32F2F",
      },
    };

    return (
      statusInfo[status] || {
        label: "Không xác định",
        color: "text.secondary",
        icon: <TimeIcon />,
        avatarColor: "#9E9E9E",
      }
    );
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatVehicleInfo = (vehicle) => {
    if (vehicle && typeof vehicle === "object") {
      const { licensePlate, brand, model, year } = vehicle;
      return `${licensePlate || ""} ${brand || ""} ${model || ""} ${
        year || ""
      }`.trim();
    }
    return vehicle;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            Quản lý lịch hẹn gara
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Theo dõi và quản lý các lịch hẹn dịch vụ
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={fetchAppointments}
        >
          Làm mới
        </Button>
      </Box>

      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3, py: 1 }}
      >
        <Link
          underline="hover"
          color="inherit"
          href="/"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Trang chủ
        </Link>
        <Typography
          color="text.primary"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "medium",
          }}
        >
          <DirectionsCarIcon sx={{ mr: 0.5 }} fontSize="small" />
          Danh Sách Lịch Book
        </Typography>
      </Breadcrumbs>

      {loading ? (
        <Box sx={{ width: "100%", mb: 4 }}>
          <LinearProgress />
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Đang tải dữ liệu...
          </Typography>
        </Box>
      ) : appointments.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", backgroundColor: "#f5f5f5" }}>
          <Typography variant="h6" color="text.secondary">
            Không có lịch hẹn nào
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {appointments.map((appointment) => {
            const statusInfo = getStatusInfo(appointment.status);

            return (
              <Grid item xs={12} key={appointment._id}>
                <AppointmentCard status={appointment.status} elevation={3}>
                  <CardContent sx={{ pb: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={9}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <StatusAvatar statuscolor={statusInfo.avatarColor}>
                            {statusInfo.icon}
                          </StatusAvatar>
                          <Box>
                            <Typography variant="h6" component="div">
                              {appointment.customer}
                            </Typography>
                            <Chip
                              label={statusInfo.label}
                              size="small"
                              sx={{
                                backgroundColor: statusInfo.color,
                                color: "white",
                              }}
                            />
                          </Box>
                        </Box>

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <CarIcon
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              <Typography variant="body1">
                                {formatVehicleInfo(appointment.vehicle)}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <BuildIcon
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              <Typography variant="body1">
                                {appointment.service}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <DateRangeIcon
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              <Typography variant="body1">
                                {formatDate(appointment.date)}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <TimeIcon
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              <Typography variant="body1">
                                {appointment.time}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        {appointment.reason && (
                          <Box
                            sx={{
                              mt: 2,
                              p: 1,
                              backgroundColor: "#fff4e5",
                              borderRadius: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontStyle: "italic" }}
                            >
                              <strong>Lý do:</strong> {appointment.reason}
                            </Typography>
                          </Box>
                        )}
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={3}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          fullWidth
                          onClick={() => handleOpenDialog(appointment)}
                          sx={{ mb: 1 }}
                        >
                          Cập nhật
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          fullWidth
                          onClick={() =>
                            handleDeleteAppointment(appointment._id)
                          }
                        >
                          Xóa
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </AppointmentCard>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          elevation: 8,
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" fontWeight="bold">
            Cập nhật trạng thái lịch hẹn
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Trạng thái"
            >
              <MenuItem value="pending">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TimeIcon sx={{ mr: 1, color: "warning.main" }} />
                  Chờ duyệt
                </Box>
              </MenuItem>
              <MenuItem value="confirmed">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon sx={{ mr: 1, color: "primary.main" }} />
                  Xác nhận
                </Box>
              </MenuItem>
              <MenuItem value="completed">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon sx={{ mr: 1, color: "success.main" }} />
                  Hoàn thành
                </Box>
              </MenuItem>
              <MenuItem value="cancelled">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CancelIcon sx={{ mr: 1, color: "error.main" }} />
                  Hủy lịch hẹn
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          {status === "cancelled" && (
            <TextField
              label="Lý do hủy"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              error={status === "cancelled" && reason.trim() === ""}
              helperText={
                status === "cancelled" && reason.trim() === ""
                  ? "Lý do không được để trống"
                  : ""
              }
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            color="inherit"
          >
            Hủy
          </Button>
          <Button
            onClick={handleUpdateStatus}
            variant="contained"
            disabled={status === "cancelled" && reason.trim() === ""}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default GarageAppointments;
