import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  useMediaQuery,
  Alert,
  Snackbar,
  styled,
} from "@mui/material";
import {
  DirectionsCar,
  CalendarMonth,
  Build,
  ArrowForward,
  ArrowBack,
  CheckCircle,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  background: "linear-gradient(145deg, #ffffff 0%, #f9fafc 100%)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "6px",
    background: "linear-gradient(90deg, #1976d2, #64b5f6)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1),
    transition: "all 0.3s ease",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 15px rgba(25, 118, 210, 0.4)",
  },
}));

const StepIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  marginBottom: theme.spacing(1),
}));

const stepIcons = [<DirectionsCar />, <Build />, <CalendarMonth />];

const BookAppointment = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [formData, setFormData] = useState({
    customer: "",
    garage: "",
    licensePlate: "",
    brand: "",
    model: "",
    year: "",
    service: "",
    date: "",
    time: "",
  });

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    const fetchGarages = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/garages");

        if (Array.isArray(response.data.garages)) {
          setGarages(response.data.garages);
        } else if (Array.isArray(response.data)) {
          setGarages(response.data);
        } else {
          setGarages([]);
          showSnackbar("Không thể tải danh sách gara", "error");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gara:", error);
        showSnackbar("Đã xảy ra lỗi khi tải danh sách gara", "error");
        setGarages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGarages();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isStepValid = () => {
    if (activeStep === 0) {
      return (
        formData.licensePlate &&
        formData.brand &&
        formData.model &&
        formData.year
      );
    } else if (activeStep === 1) {
      return formData.garage && formData.service;
    } else if (activeStep === 2) {
      return formData.date && formData.time;
    }
    return true;
  };

  const steps = ["Thông tin xe", "Dịch vụ", "Thời gian"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.id) {
      showSnackbar(
        "Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập lại!",
        "error"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/appointment/book",
        {
          customer: user.id,
          garage: formData.garage,
          vehicle: {
            licensePlate: formData.licensePlate,
            brand: formData.brand,
            model: formData.model,
            year: formData.year,
          },
          service: formData.service,
          date: formData.date,
          time: formData.time,
        }
      );

      showSnackbar("Đặt lịch thành công!", "success");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      showSnackbar("Đặt lịch thất bại. Vui lòng thử lại.", "error");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Biển số xe"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Ví dụ: 51F-123.45"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Hãng xe"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Toyota, Honda, BMW..."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Mẫu xe"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Vios, CR-V, 320i..."
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Năm sản xuất"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="2023"
                InputProps={{ inputProps: { min: 1900, max: 2025 } }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledTextField
                select
                fullWidth
                label="Chọn Gara"
                name="garage"
                value={formData.garage}
                onChange={handleChange}
                required
                variant="outlined"
                helperText="Vui lòng chọn gara gần nhất"
              >
                {loading ? (
                  <MenuItem disabled>Đang tải...</MenuItem>
                ) : garages.length > 0 ? (
                  garages.map((garage) => (
                    <MenuItem key={garage._id} value={garage._id}>
                      {garage.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Không có gara nào</MenuItem>
                )}
              </StyledTextField>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Dịch vụ"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Bảo dưỡng định kỳ, thay dầu..."
                multiline
                rows={3}
                helperText="Mô tả ngắn gọn dịch vụ bạn cần"
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Vui lòng chọn ngày và giờ phù hợp (trong giờ làm việc từ 8:00 -
                18:00)
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Ngày hẹn"
                name="date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={handleChange}
                required
                variant="outlined"
                inputProps={{ min: minDate }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Giờ hẹn"
                name="time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formData.time}
                onChange={handleChange}
                required
                variant="outlined"
                inputProps={{ min: "08:00", max: "18:00" }}
                helperText="Giờ làm việc: 8:00 - 18:00"
              />
            </Grid>
          </Grid>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <StyledPaper elevation={4}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="700"
            color="primary"
            sx={{
              mb: 1,
              background: "linear-gradient(90deg, #1976d2, #64b5f6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Đặt Lịch Hẹn Dịch Vụ
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Chúng tôi sẽ liên hệ xác nhận lịch hẹn của bạn trong thời gian sớm
            nhất
          </Typography>
          <Divider sx={{ mb: 4 }} />
        </Box>

        {/* Stepper */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel={!isMobile}
          orientation={isMobile ? "vertical" : "horizontal"}
          sx={{ mb: 4 }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={() => (
                  <StepIcon>{stepIcons[index]}</StepIcon>
                )}
              >
                <Typography fontWeight="500">{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={handleSubmit}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              mb: 4,
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {renderStepContent(activeStep)}
            </CardContent>
          </Card>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBack}
              disabled={activeStep === 0}
              startIcon={<ArrowBack />}
              sx={{ borderRadius: 1.5 }}
            >
              Quay lại
            </Button>

            {activeStep === steps.length - 1 ? (
              <ActionButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isStepValid() || loading}
                endIcon={
                  loading ? <CircularProgress size={20} /> : <CheckCircle />
                }
              >
                {loading ? "Đang xử lý..." : "Hoàn tất đặt lịch"}
              </ActionButton>
            ) : (
              <ActionButton
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!isStepValid()}
                endIcon={<ArrowForward />}
              >
                Tiếp tục
              </ActionButton>
            )}
          </Box>
        </Box>
      </StyledPaper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookAppointment;
