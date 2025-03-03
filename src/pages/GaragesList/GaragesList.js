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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";

const PriceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#004d40",
  color: theme.palette.common.white,
  fontWeight: "bold",
  borderRadius: 4,
  "&:hover": {
    backgroundColor: alpha("#004d40", 0.9),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  border: "1px solid #e0e0e0",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[10],
  },
}));

const CardHeaderStyled = styled(CardHeader)(({ theme }) => ({
  backgroundColor: "#004d40",
  color: theme.palette.common.white,
  "& .MuiCardHeader-title": {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
}));

const ServiceHeading = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const ViewButton = styled(Button)(({ theme }) => ({
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
}));

const ServicePaper = styled(Paper)(({ theme }) => ({
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
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: alpha("#004d40", 0.3),
    borderRadius: "3px",
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: theme.spacing(1.5),
  "& svg": {
    marginTop: 2,
    marginRight: theme.spacing(1.5),
  },
}));

const GaragesList = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleViewDetail = (garageId) => {
    navigate(`/garages/${garageId}`);
  };

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/garages");
        setGarages(response.data.garages);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu gara");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGarages();
  }, []);

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
    <>
    
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
              <StyledCard elevation={2}>
                <CardHeaderStyled
                  title={garageOwner.garage.name}
                  titleTypographyProps={{ fontWeight: "bold" }}
                />
                <CardContent sx={{ flexGrow: 1, px: 3, pt: 2.5 }}>
                  <InfoBox>
                    <PersonIcon sx={{ color: theme.palette.common.black }} />
                    <Typography variant="body1">
                      <strong>Chủ gara:</strong> {garageOwner.name}
                    </Typography>
                  </InfoBox>

                  <InfoBox>
                    <LocationOnIcon
                      sx={{ color: theme.palette.common.black }}
                    />
                    <Typography variant="body1" sx={{ flex: 1 }}>
                      <strong>Địa chỉ:</strong> {garageOwner.garage.address}
                    </Typography>
                  </InfoBox>

                  <InfoBox>
                    <PhoneIcon sx={{ color: theme.palette.common.black }} />
                    <Typography variant="body1">
                      <strong>Số điện thoại:</strong> {garageOwner.garage.phone}
                    </Typography>
                  </InfoBox>

                  <InfoBox>
                    <AccessTimeIcon
                      sx={{ color: theme.palette.common.black }}
                    />
                    <Typography variant="body1">
                      <strong>Giờ làm việc:</strong>{" "}
                      {garageOwner.garage.workingHours.open} -{" "}
                      {garageOwner.garage.workingHours.close}
                    </Typography>
                  </InfoBox>

                  <Divider
                    sx={{
                      my: 2.5,
                      borderColor: alpha(theme.palette.common.black, 0.1),
                    }}
                  />

                  <ServiceHeading>
                    <BuildIcon
                      sx={{ mr: 1.5, color: theme.palette.common.black }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.common.black,
                      }}
                    >
                      Dịch vụ
                    </Typography>
                  </ServiceHeading>

                  <ServicePaper>
                    <List disablePadding>
                      {garageOwner.garage.services.map((service, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && (
                            <Divider
                              component="li"
                              sx={{
                                borderColor: alpha(
                                  theme.palette.common.black,
                                  0.1
                                ),
                              }}
                            />
                          )}
                          <ListItem sx={{ px: 1, py: 1.5 }}>
                            <ListItemText
                              primary={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 500 }}
                                  >
                                    {service.name}
                                  </Typography>
                                  <PriceChip
                                    label={`${service.price.toLocaleString()} VND`}
                                    size="small"
                                  />
                                </Box>
                              }
                            />
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  </ServicePaper>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                  >
                    <ViewButton
                      onClick={() => handleViewDetail(garageOwner.garage._id)}
                      startIcon={<NavigateNextIcon />}
                    >
                      Xem chi tiết
                    </ViewButton>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
     
    </>
  );
};

export default GaragesList;
