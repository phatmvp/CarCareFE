import React from "react";
import CustomerLogin from "./CustomerLogin";
import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CustomerLoginPage({ onLogin }) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <CustomerLogin onLogin={() => onLogin("customer")} />
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

export default CustomerLoginPage;
