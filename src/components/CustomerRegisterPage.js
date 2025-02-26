import React from "react";
import CustomerRegister from "./CustomerRegister";
import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CustomerRegisterPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <CustomerRegister onBack={() => navigate("/loginCustomer")} />
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

export default CustomerRegisterPage;
