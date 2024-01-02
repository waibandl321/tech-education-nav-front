import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card, Container, useMediaQuery } from "@mui/material";
import usePasswordReset from "@/hooks/components/auth/usePasswordReset";
import PasswordRequestForm from "@/components/pages/auth/PasswordReset/section/PasswordRequestForm";

export default function PasswordResetRequest() {
  // hooks
  const isMobile = useMediaQuery("(max-width:640px)");
  const { requestPasswordReset } = usePasswordReset();

  return (
    <Container sx={{ py: 5 }} component="main" maxWidth="sm">
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
          パスワードの再設定
        </Typography>
        <Typography sx={{ mt: 3 }}>
          メールアドレスを入力して認証コードをお受け取りください。
        </Typography>
        <Box sx={{ mt: 4 }}>
          <PasswordRequestForm onSubmit={requestPasswordReset} />
        </Box>
      </Card>
    </Container>
  );
}
