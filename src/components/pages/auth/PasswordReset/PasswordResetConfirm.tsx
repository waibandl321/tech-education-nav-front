import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Button, Card, Container, useMediaQuery } from "@mui/material";
import usePasswordReset from "@/components/hooks/auth/usePasswordReset";
import PasswordConfirmForm from "./section/PasswordConfirmForm";
import { useRouter } from "next/router";

export default function PasswordResetConfirm() {
  // hooks
  const isMobile = useMediaQuery("(max-width:640px)");
  const router = useRouter();
  const { confirmPasswordReset } = usePasswordReset();

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 5 }}>
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
          パスワード再設定
        </Typography>
        <Typography sx={{ mt: 3 }}>
          登録されたメールアドレスに認証コードを送信しました。認証コードと新しいパスワードを入力して会員登録を完了させてください。
        </Typography>
        <Box sx={{ mt: 4 }}>
          <PasswordConfirmForm onSubmit={confirmPasswordReset} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button onClick={() => router.push("/auth/reset-password")}>
            認証コードを再発行する
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
