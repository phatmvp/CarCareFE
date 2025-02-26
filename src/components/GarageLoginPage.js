import React from "react";
import GarageLogin from "./GarageLogin";
import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function GarageLoginPage({ onLogin }) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <GarageLogin onLogin={() => onLogin("garage")} />
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

export default GarageLoginPage;
