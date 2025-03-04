import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Breadcrumbs,
  Link,
  useTheme,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AccessTime as AccessTimeIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  Build as BuildIcon,
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
  DirectionsCar as DirectionsCarIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Styled components
const StyledComponents = {
  PriceChip: styled(Chip)(({ theme }) => ({
    backgroundColor: "#004d40",
    color: theme.palette.common.white,
    fontWeight: "bold",
    borderRadius: 4,
    "&:hover": {
      backgroundColor: alpha("#004d40", 0.9),
    },
  })),

  Card: styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "1px solid #e0e0e0",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: theme.shadows[10],
    },
  })),

  CardHeader: styled(CardHeader)(({ theme }) => ({
    backgroundColor: "#004d40",
    color: theme.palette.common.white,
    "& .MuiCardHeader-title": {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
  })),

  ServiceHeading: styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  })),

  ViewButton: styled(Button)(({ theme }) => ({
    backgroundColor: "#004d40",
    color: theme.palette.common.white,
    borderRadius: 4,
    fontWeight: "bold",
    padding: "8px 16px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: alpha("#004d40", 0.8),
      transform: "scale(1.05)",
    },
  })),

  ServicePaper: styled(Paper)(({ theme }) => ({
    border: `1px solid ${alpha("#004d40", 0.2)}`,
    borderRadius: 8,
    padding: theme.spacing(1.5),
    maxHeight: "200px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: alpha("#004d40", 0.05),
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: alpha("#004d40", 0.3),
      borderRadius: "3px",
    },
  })),

  InfoBox: styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "flex-start",
    marginBottom: theme.spacing(1.5),
    "& svg": {
      marginTop: 2,
      marginRight: theme.spacing(1.5),
    },
  })),
};

const API_BASE_URL = "http://localhost:5000/api";

const GaragesList = () => {
  const [garages, setGarages] = useState([]);
  const [ownerNames, setOwnerNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/garages`);
        setGarages(response.data.garages);

        // Fetch all owner names in parallel
        const ownerIds = response.data.garages.map((garage) => garage.owner);
        const uniqueOwnerIds = [...new Set(ownerIds)];

        const ownerPromises = uniqueOwnerIds.map((ownerId) =>
          axios.get(`${API_BASE_URL}/${ownerId}/owner-name`)
        );

        const ownerResponses = await Promise.all(ownerPromises);

        const nameMap = {};
        ownerResponses.forEach((response, index) => {
          nameMap[uniqueOwnerIds[index]] =
            response.data.data.ownerName.fullName;
        });

        setOwnerNames(nameMap);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu gara: " + err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGarages();
  }, []);

  const handleViewDetail = (garageId) => {
    navigate(`/garages/${garageId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
          flexDirection: "column",
          height: "50vh",
        }}
      >
        <CircularProgress
          size={60}
          sx={{ color: theme.palette.common.black }}
        />
        <Typography variant="h6" sx={{ mt: 3, fontWeight: 500 }}>
          Đang tải danh sách gara...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Breadcrumbs */}
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
          sx={{ display: "flex", alignItems: "center", fontWeight: "medium" }}
        >
          <DirectionsCarIcon sx={{ mr: 0.5 }} fontSize="small" />
          Danh sách Gara
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          mb: 5,
          fontWeight: "bold",
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            width: "60px",
            height: "3px",
            backgroundColor: theme.palette.common.black,
            margin: "12px auto 0",
          },
        }}
      >
        DANH SÁCH GARA
      </Typography>

      <Grid container spacing={3}>
        {garages.map((garageOwner) => (
          <Grid item xs={12} md={6} lg={4} key={garageOwner._id}>
            <StyledComponents.Card elevation={2}>
              <StyledComponents.CardHeader
                title={garageOwner.name || "Không có tên"}
                titleTypographyProps={{ fontWeight: "bold" }}
              />
              <CardContent sx={{ flexGrow: 1, px: 3, pt: 2.5 }}>
                <GarageInfoItem
                  icon={<PersonIcon />}
                  label="Chủ gara"
                  value={ownerNames[garageOwner.owner]}
                />

                <GarageInfoItem
                  icon={<LocationOnIcon />}
                  label="Địa chỉ"
                  value={garageOwner?.address || "Không có địa chỉ"}
                />

                <GarageInfoItem
                  icon={<PhoneIcon />}
                  label="Số điện thoại"
                  value={garageOwner?.phone || "Không có số điện thoại"}
                />

                <GarageInfoItem
                  icon={<AccessTimeIcon />}
                  label="Giờ làm việc"
                  value={`${garageOwner?.workingHours?.open || "N/A"} - ${
                    garageOwner?.workingHours?.close || "N/A"
                  }`}
                />

                <Divider
                  sx={{
                    my: 2.5,
                    borderColor: alpha(theme.palette.common.black, 0.1),
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <StyledComponents.ViewButton
                    onClick={() => handleViewDetail(garageOwner._id)}
                    startIcon={<NavigateNextIcon />}
                  >
                    Xem chi tiết
                  </StyledComponents.ViewButton>
                </Box>
              </CardContent>
            </StyledComponents.Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Extracted reusable components
const GarageInfoItem = ({ icon, label, value }) => {
  const theme = useTheme();

  return (
    <StyledComponents.InfoBox>
      {React.cloneElement(icon, { sx: { color: theme.palette.common.black } })}
      <Typography variant="body1">
        <strong>{label}:</strong> {value}
      </Typography>
    </StyledComponents.InfoBox>
  );
};

export default GaragesList;
