import React from "react";
import GarageRegister from "./GarageRegister";
import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function GarageRegisterPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <GarageRegister onBack={() => navigate("/loginGarage")} />
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => navigate("/")}
      >
        Quay lại Trang chủ
      </Button>
    </Container>
  );
}

export default GarageRegisterPage;
