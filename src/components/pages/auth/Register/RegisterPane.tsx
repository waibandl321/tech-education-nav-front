import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, useMediaQuery } from "@mui/material";
import useRegister from "@/hooks/components/auth/useRegister";
import RegisterFormSection from "./RegisterFormSection";
import RegisterLinkSection from "./RegisterLinkSection";

export default function RegisterPane() {
  // hooks
  const isMobile = useMediaQuery("(max-width:480px)");
  const { signUpSubmit } = useRegister();

  return (
    <Container
      sx={isMobile ? { px: 2, py: 4 } : { px: 4, py: 6 }}
      component="main"
      maxWidth="sm"
    >
      <Card
        sx={{
          p: isMobile ? 2 : 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          会員登録
        </Typography>
        <Typography sx={{ mt: 3 }}>
          メールアドレス、パスワードを送信すると、メールアドレス宛に認証コードが送信されます。
          「認証コード」の確認は次の画面で行います。
        </Typography>
        <RegisterFormSection onSubmit={signUpSubmit} />
        <RegisterLinkSection />
      </Card>
    </Container>
  );
}
