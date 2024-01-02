import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, useMediaQuery } from "@mui/material";
import useRegister from "@/hooks/components/auth/useRegister";
import RegisterForm from "./section/RegisterForm";
import RegisterLinks from "./section/RegisterLinks";

export default function Register() {
  // hooks
  const isMobile = useMediaQuery("(max-width:640px)");
  const { signUpSubmit } = useRegister();

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 5 }}>
      <Card
        sx={{
          p: isMobile ? 2 : 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          会員登録
        </Typography>
        <RegisterForm onSubmit={signUpSubmit} />
        <RegisterLinks />
      </Card>
    </Container>
  );
}
